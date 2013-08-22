var channelModule = angular.module('cmaccount.channel', []);
channelModule.service('ChannelService', function($q, $http, $rootScope, $timeout, API_BASE) {
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
  var self = this;
  this.aesKey = null;
  this.dfd = null;
  this.hashedPassword = null;
  
  this.sessionId = null;
  this.remoteSequence = 0;
  this.localSequence = 0;

  var canDecrypt = function() {
    return (self.aesKey);
  };

  var canExchangeKeys = function() {
    return (self.hashedPassword);
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

  var validateSession = function(sessionId) {
    if (self.sessionId != sessionId) {
      $analytics.eventTrack('invalidSession', { category: 'secmsg' });
      logging.warn("SecureMessageService: Session", sessionId, "is invalid");
      return false;
    } else {
      return true;
    }
  };

  var setSessionId = function(sessionId) {
    resetSession();
    self.sessionId = sessionId;
  };

  var resetSession = function() {
    self.sessionId = null;
    self.remoteSequence = 0;
    self.localSequence = 0;
  };

  var resetEncryption = function() {
    self.aesKey = null;
    self.hashedPassword = null;

    $rootScope.$apply(function() {
      self.dfd.reject();
    });
  };
 
  // Subscribe to key_exchange messages
  ChannelService.on('key_exchange', function(command, message) {
    // If we are not ready for key exchange, drop the message.
    if (!canExchangeKeys()) {
      logging.warn("SecureMessageService: Can't exchange keys yet, dropping message.");
      return;
    }

    // Hang on to the message details
    var messageDetails = {
      device: message.device,
      session_id: message.session_id,
    };
    message = message.message;

    // Setup the session
    setSessionId(messageDetails.session_id);

    // Decrypt AES key
    var _aesKey = Util.rsa.decrypt(message.symmetric_key);

    // Verify symmetric key by hashing it with our password
    var keyVerification = Util.sha512(_aesKey + self.hashedPassword);
    if (keyVerification != message.symmetric_key_verification) {
      logging.error("SecureMessageService: Unable to verify symmetric key");
      resetEncryption();
      return;
    }

    // If for some reason we already have the same key, don't resolve.
    if ((self.aesKey == _aesKey) && (messageDetails.session_id == self.sessionId)) {
      logging.warn("SecureMessageService: Already have this AES key and sessionId, skipping.");
      return;
    }

    // Everything looks good, resolve deferred.
    self.aesKey = _aesKey;
    $rootScope.$apply(function() {
      logging.debug("SecureMessageService: Ready!", self.aesKey);
      self.dfd.resolve();
    });
  });

  // Subscribe to key_exchange_failed messages
  ChannelService.on('key_exchange_failed', function(command, message) {
    $analytics.eventTrack('keyExchangeFailed', { category: 'secmsg' });
    logging.warn("SecureMessageService: Got key exchange failed message, resetting.");
    resetEncryption();
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
      session_id: message.session_id
    };
    message = message.message;

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
      if (!validateSession(messageDetails.session_id)) return;
      
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

  // Public
  this.openChannel = ChannelService.open;

  this.sendPublicKey = function(deviceKey, password, deviceSalt) {
    // Clear the aesKey
    self.aesKey = null;

    // Hash the password
    self.hashedPassword = Util.sha512(password);

    // Derive the HMAC secret from the hashed password and device salt using PBKDF2.
    deviceSalt = CryptoJS.enc.Base64.parse(deviceSalt);
    var hmacSecret = CryptoJS.enc.Base64.stringify(CryptoJS.PBKDF2(self.hashedPassword, deviceSalt, { iterations: 1024 }));

    // Generate a signature for the public key using HMAC-SHA512.
    var publicKey = Util.rsa.getPublicKeyData();
    var publicKeySignature = CryptoJS.HmacSHA512(publicKey, hmacSecret);

    // Create the key exchange message
    var message = {
      'device_key': deviceKey,
      'command': 'key_exchange',
      'message': {
        'public_key': publicKey,
        'signature': CryptoJS.enc.Base64.stringify(publicKeySignature)
      }
    };

    logging.debug("SecureMessageService: Sending public key to device");
    $http.post(API_BASE + '/secmsg/send_gcm', message, {requireToken: true});
  };

  this.ready = function() {
    self.dfd = $q.defer();
    return self.dfd.promise;
  };

  this.sendGCM = function(deviceKey, plaintext) {
    // Increase the sequence number.
    self.localSequence += 1;

    // Add our sequence number.
    plaintext.sequence = self.localSequence;

    // Encrypt the message.
    var encrypted = Util.aes.encrypt(JSON.stringify(plaintext), self.aesKey);
    var message = {
      'command': 'secure_message',
      'device_key': deviceKey,
      'session_id': self.sessionId,
      'message': encrypted
    };

    logging.debug("SecureMessageService: Sending secure GCM", message);
    $http.post(API_BASE + '/secmsg/send_gcm', message, {requireToken: true});
  };
});
