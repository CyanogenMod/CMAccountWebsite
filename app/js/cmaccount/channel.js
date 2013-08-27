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

    // Hang on to the message details
    var messageDetails = {
      device: message.device,
      key_id: message.key_id,
    };
    message = message.message;

    // Verify message signature
    var signatureBody = message.ciphertext + ":" + message.initializationVector;
    var signatureHex = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(signatureBody, self.hmacSecret));
    if (signatureHex != message.signature) {
      logging.warn("SecureMessageService: Unable to verify message signature.");
      return;
    }

    // Decrypt the message using AES
    var decrypted = Util.aes.decrypt(message.ciphertext, self.aesKey, message.initializationVector);
    var decryptedMessage;

    if (!decrypted) {
      $analytics.eventTrack('errorDecryptingMessage', { category: 'secmsg' });
      logging.error("SecureMessageService: Error decrypting message");
      return;
    }

    // Catch any exceptions while parsing JSON
    try {
      decryptedMessage = JSON.parse(decrypted);
    } catch (e) {
      $analytics.eventTrack('errorParsingJson', { category: 'secmsg' });
      logging.error("SecureMessageService: Error while parsing decrypted JSON message");
      return;
    }

    if (decryptedMessage) {
      // Validate the session
      if (!validateSession(messageDetails.key_id)) return;
      
      // Validate the sequence
      if (!validateSequence(decryptedMessage.params.sequence)) return;

      // Merge the message params and message details, so the controller
      // can use things like the device
      var mergedMessage = _.merge(decryptedMessage.params, messageDetails);

      // Broadcast the message on the rootScope
      logging.debug("SecureMessageService: Got decrypted secure message", mergedMessage);
      $rootScope.$broadcast('secure_message:' + decryptedMessage.command, mergedMessage);
    }
  });

  this.openChannel = ChannelService.open;

  this.ready = function() {
    self.dfd = $q.defer();
    return self.dfd.promise;
  };

  var getSymmetricKey = function(deviceKey) {
    logging.debug("SecureMessageService: Asking server for public key");
    var dfd = $q.defer();

    if (!self.aesKey) {
      $http.get(API_BASE + "/device/get_public_key?device_key=" + deviceKey, {requireToken: true}).success(function(response) {
        setKeyId(response.key_id);
        response.x = Util.hexToBytes(response.x);
        response.y = Util.hexToBytes(response.y);
        var remotePublicKey = new ECPublicKey(response.x, response.y);
        var keyBytes = Util.ecdh.getSecret(remotePublicKey).toByteArray();
        // BigIntegers are stored in two's complement notation.  The first byte determines the sign.
        // Because of this, there may be a signing byte, giving us a 264bit key, but  we need a 256bit key.
        // If there is a signing byte, drop it.  Both sides must do this.
        if (keyBytes.length == 33) {
          keyBytes = keyBytes.slice(1, keyBytes.length);
        }
        self.aesKey = Util.bytesToHex(keyBytes);
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
    deviceSalt = CryptoJS.enc.Base64.parse(deviceSalt);
    getSymmetricKey(deviceKey).then(function(symmetricKey) {
      self.localSequence += 1;
      plaintextMessage.sequence = self.localSequence;

      // Encrypt the plaintext message
      var encrypted = Util.aes.encrypt(JSON.stringify(plaintextMessage), self.aesKey);
      var message = {
        command: 'secure_message',
        device_key: deviceKey,
        key_id: self.keyId,
        message: encrypted
      };

      // If this is the first message we are sending, include our public key.
      if (self.localSequence == 1) {
        message.public_key = Util.ecdh.getPublic().toHexObject();
      }

      self.hmacSecret = CryptoJS.PBKDF2(password, deviceSalt, { keySize: 32/4, iterations: 1024 });
      
      // Sign public key
      var publicKeySignatureBody = message.public_key.x + ':' + message.public_key.y;
      var publicKeySignatureHex = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(publicKeySignatureBody, self.hmacSecret));
      message.public_key.signature = publicKeySignatureHex;

      // Sign encrypted message
      var encryptedMessageSignatureBody = encrypted.ciphertext + ':' + encrypted.initializationVector;
      var encryptedMessageSignatureHex = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(encryptedMessageSignatureBody, self.hmacSecret));
      message.message.signature = encryptedMessageSignatureHex;

      logging.debug("SecureMessageService: Sending secure GCM", message);
      $http.post(API_BASE + '/secmsg/send_gcm', message, {requireToken: true});

    }, function(error) {
      logging.error("SecureMessageService: Error getting public key from server:", error);
    });
  };
});
