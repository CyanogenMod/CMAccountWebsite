var channelModule = angular.module('cmaccount.channel', []);
channelModule.service('ChannelService', function($q, $http, $rootScope, $timeout, $analytics, API_BASE) {
  // Private members
  var dfd = null;
  var token = null;
  var channel = null;
  var socket = null;
  var self = this;

  this.open = function() {
    dfd = $q.defer();
    if (socket) {
      logging.warn('ChannelService: Channel already opened');
      dfd.resolve();
      return dfd.promise;
    } else {
      logging.debug('ChannelService: Opening channel');
      $http.get(API_BASE + '/channel/open', {requireToken: true}).success(function(data) {
        token = data.token;
        logging.debug('ChannelService: Channel token:', token);
        self.createChannel();
      });
      return dfd.promise;
    }
  };

  this.createChannel = function() {
    channel = new goog.appengine.Channel(token);
    socket = channel.open();
    socket.onopen = self.onOpen;
    socket.onmessage = self.onMessage;
    socket.onerror = self.onError;
    socket.onclose = self.onClose;
  };

  this.onOpen = function() {
    logging.info('ChannelService: Channel opened');
    // Since this method is executed outside of angular, resolve through $apply.
    $rootScope.$apply(function() {
      dfd.resolve();
    }, 3000);
  };

  this.onMessage = function(message) {
    message = JSON.parse(message.data) || {};
    $rootScope.$broadcast('channel_message:' + message.command, message);
  };

  this.onError = function() {
    $analytics.eventTrack('channelError', { category: 'secmsg' });
    logging.error('ChannelService: Channel error');
  };

  this.onClose = function() {
    logging.info('ChannelService: Channel closed');
  };

  this.on = function(type, fn) {
    $rootScope.$on('channel_message:' + type, fn);
  };
});

channelModule.service('SecureMessageService', function($q, $http, $rootScope, $analytics, ChannelService, API_BASE) {
  this.aesKey = null;
  this.keyId = null;
  this.remoteSequence = 0;
  this.localSequence = 0;
  this.dfd = null;
  this.hmacSecret = null;
  var self = this;

  var canDecrypt = function() {
    return (self.aesKey);
  };

  var validateSequence = function(newSequence) {
    if (!newSequence || newSequence <= self.remoteSequence) {
      $analytics.eventTrack('invalidSequence', { category: 'secmsg' });
      logging.warn("SecureMessageService: Sequence", newSequence, "is invalid.");
      return false;
    } else {
      self.remoteSequence= newSequence;
      return true;
    }
  };

  var validateSession = function(keyId) {
    if (self.keyId != keyId) {
      $analytics.eventTrack('invalidSession', { category: 'secmsg' });
      logging.warn("SecureMessageService: keyId", keyId, "is invalid");
      return false;
    } else {
      return true;
    }
  };

  var setKeyId = function(keyId) {
    resetSession();
    self.keyId = keyId;
  };

  var resetSession = function() {
    self.keyId = null;
    self.remoteSequence = 0;
    self.localSequence = 0;
  };

  var resetEncryption = function() {
    self.aesKey = null;
    self.hmacSecret =  null;
  };

  // Subscribe to key_exchange_failed messages
  ChannelService.on('key_exchange_failed', function(command, message) {
    $analytics.eventTrack('keyExchangeFailed', { category: 'secmsg' });
    logging.warn("SecureMessageService: Got key exchange failed message, resetting.");
    resetSession();
    resetEncryption();
    $rootScope.$apply(function() { self.dfd.reject(); });
  });

  // Subscribe to secure_message messages
  ChannelService.on('secure_message', function(command, message) {
    // Check that we have the AES key, if not, drop the message.
    if (!canDecrypt()) {
      logging.warn("SecureMessageService: Received secure message, but don't have a key yet.  Dropping");
      return;
    }

    // Verify payload signature
    var payload = message.payload;
    var payloadSignature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(payload, self.hmacSecret));
    if (payloadSignature != message.signature) {
      logging.warn("SecureMessageService: Unable to verify payload signature.");
      return;
    }

    try {
      payload = JSON.parse(payload);
    } catch (e) {
      logging.error("SecureMessageService: Error parsing json payload");
    }

    // Decrypt the message using AES
    var decrypted = Util.aes.decrypt(payload.ciphertext, self.aesKey, payload.initializationVector);
    if (!decrypted) {
      $analytics.eventTrack('errorDecryptingMessage', { category: 'secmsg' });
      logging.error("SecureMessageService: Error decrypting message");
      return;
    }

    // Catch any exceptions while parsing JSON
    try {
      payload = JSON.parse(decrypted);
    } catch (e) {
      payload = undefined;
      $analytics.eventTrack('errorParsingJson', { category: 'secmsg' });
      logging.error("SecureMessageService: Error while parsing decrypted JSON message");
      return;
    }

    if (payload) {
      // Validate the session
      if (!validateSession(payload.key_id)) return;
      
      // Validate the sequence
      if (!validateSequence(payload.params.sequence)) return;

      // Tack on the device to the payload
      var command = payload.command;
      payload = _.merge(payload.params, {
        device: message.device
      });

      // Broadcast the message on the rootScope
      logging.debug("SecureMessageService: Got decrypted secure message", payload);
      $rootScope.$broadcast('secure_message:' + command, payload);
    }
  });

  this.openChannel = ChannelService.open;

  this.ready = function() {
    resetEncryption();
    resetSession();
    self.dfd = $q.defer();
    return self.dfd.promise;
  };

  var getSymmetricKey = function(deviceKey, deviceSalt, password) {
    logging.debug("SecureMessageService: Asking server for public key");
    var dfd = $q.defer();
    self.hmacSecret = CryptoJS.PBKDF2(password, deviceSalt, { keySize: 32/4, iterations: 1024 });

    if (!self.aesKey) {
      $http.get(API_BASE + "/device/get_public_key?device_key=" + deviceKey, {requireToken: true}).success(function(response) {
        // Verify remote public key
        var publicKeySignatureBody = response.public_key;
        var publicKeySignatureHex = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(publicKeySignatureBody, self.hmacSecret));
        if (publicKeySignatureHex != response.signature) {
          logging.error("SecureMessageService: Remote public key verification failed.");
          dfd.reject();
        };
        setKeyId(response.key_id);
        var remotePublicKey = new ECPublicKey(response.public_key);
        var keyHex = Util.bytesToHex(Util.ecdh.getSecret(remotePublicKey));
        // Hash the private key with SHA256 to use as AES key
        self.aesKey = CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(CryptoJS.enc.Hex.parse(keyHex)));
        dfd.resolve(self.aesKey);
      }).error(function(error) {
        dfd.reject(error);
      });
    } else {
      dfd.resolve(self.aesKey);
    }

    return dfd.promise;
  };

  this.sendGCM = function(deviceKey, password, deviceSalt, plaintextMessage) {
    var dfd = $q.defer();
    deviceSalt = CryptoJS.enc.Base64.parse(deviceSalt);
    getSymmetricKey(deviceKey, deviceSalt, password).then(function(symmetricKey) {
      self.localSequence += 1;
      plaintextMessage.sequence = self.localSequence;

      // Encrypt the plaintext message
      var encrypted = Util.aes.encrypt(JSON.stringify(plaintextMessage), self.aesKey);
      var message = {
        command: 'secure_message',
        device_key: deviceKey,
        payload: {
          key_id: self.keyId,
          ciphertext: encrypted
        }
      };

      // If this is the first message we are sending, include our public key.
      if (self.localSequence == 1) {
        message.payload.public_key = Util.ecdh.getPublic().toHex();
      }

      // JSON stringify the payload
      message.payload = JSON.stringify(message.payload);

      // Sign payload
      var payloadSignature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(message.payload, self.hmacSecret));
      message.signature = payloadSignature;

      logging.debug("SecureMessageService: Sending secure GCM", message);
      $http.post(API_BASE + '/secmsg/send_gcm', message, {requireToken: true});
      dfd.resolve();
    }, function(error) {
      logging.error("SecureMessageService: Error getting public key from server:", error);
      dfd.reject();
    });
    return dfd.promise;
  };
});
