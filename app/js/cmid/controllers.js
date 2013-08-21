var cmid = window.cmid || {};

// Controllers
var RegisterController = function($rootScope, $scope, $location, Account) {
  $scope.model = {};

  $scope.register = function() {
    // Hash the password with SHA512 before sending to the server.
    var hashed_password = Util.doubleHash($scope.model.password);

    var params = angular.copy($scope.model);
    params.password = hashed_password;
    params.password_verify = hashed_password;
		
    Account.register(params, function(result) {
      $scope.registered = true;
		});
  };
};

var LoginController = function($rootScope, $scope, $location, AuthService) {
  $rootScope.loginController = true;
  $scope.model = {};

  $scope.signin = function() {
    var params = angular.copy($scope.model);
    var hashed_password = Util.doubleHash(params.password);
    params.password = hashed_password;

    AuthService.signin(params).then(function(result) {
      if (result.email_verified) {
        $location.path('/devices');
      } else {
        $location.path('/account/verify_email');
      }
    }, function(errors) {
      if (Util.matchError(errors, 3)) {
        $scope.authenticationError = true;
        $scope.model = {};
        $scope.form.$setPristine();
      } else if (Util.matchError(errors, 12)) {
        $rootScope.verifyEmail = params.email;
        $location.path('/account/verify_email');
      } else {
        // TODO: Throw a generic error
      }
    });
  };
};

var DevicesController = function($scope, profile, devices) {
  $scope.profile = profile;
  $scope.devices = devices;
};

DevicesController.resolve = {
  profile: function(Account, $q) {
    var dfd = $q.defer();
    Account.get(function(data) {
      dfd.resolve(data);
    });
    return dfd.promise;
  },
  devices: function(Device, $q) {
    var dfd = $q.defer();
    Device.list(function(data) {
      dfd.resolve(data);
    });
    return dfd.promise;
  }
};

var AccountPasswordResetController = function($scope, $routeParams, $location, Account) {
  if ($routeParams.reset_key) {
    $scope.model = {};
    $scope.resetKey = $routeParams.reset_key;
  }

  $scope.initiate_password_reset = function() {
    Account.initiate_password_reset({email: $scope.email}, function(response) {
      if (response.success) {
        $scope.emailSent = true;
        $scope.invalidEmail = false;
      } else if (response.errors) {
        if (Util.matchError(response.errors, 7)) $scope.invalidEmail = true;
      }
    });
  };

  $scope.finish_password_reset = function() {
    var password = Util.doubleHash($scope.model.password);
    Account.reset_password({
      password: password,
      reset_key: $scope.resetKey
    }, function(response) {
      if (response.success) {
        $scope.invalidResetKey = false;
        $location.path("/login");
      } else if (response.errors) {
        if (Util.matchError(response.errors, 7)) $scope.invalidResetKey = true;
      }
    });
  };
};

var AccountVerifyEmailController = function($scope, $routeParams, $location, Account) {
  if ($routeParams.verify_key) {
    $scope.verifyKey = $routeParams.verify_key;
    Account.verify_email({verify_key: $scope.verifyKey}, function(response) {
      if (response.errors) {
        if (Util.matchError(response.errors, 7)) {
          $scope.verificationError = true;
        }
      } else {
        $scope.emailVerified = true;
      }
    });
  }

  $scope.resend = function() {
    Account.resend_verify_email({email: $scope.verifyEmail}, function(response) {
      if (!response.errors) {
        $scope.emailSent = true;
      }
    });
  };
};

var DeviceFindController = function($scope, $routeParams, $http, $timeout, $analytics, SecureMessageService, Device, API_BASE) {
  // Setup scope variables
  var deviceKey = $routeParams.device_id;
  $scope.device = Device.get({'id': deviceKey});

  // Reset the view
  $scope.haveLocation = false;
  $scope.haveEncryptionKey = false;
  $scope.havePassword = false;
  $scope.encryptionKeyTimeout = false;

  // Hook up the authenticate method to the scope
  $scope.authenticate = function() {
    $scope.havePassword = true;
    SecureMessageService.openChannel().then(function() {
      SecureMessageService.sendPublicKey(deviceKey, $scope.plaintextPassword);
      waitForEncryptionKey();
    });
  };

  var reportSuccessfulLocate = _.once(function() {
    $scope.$apply(function() {
      $analytics.eventTrack('locateSuccess', { category: 'device' });
    });
  });

  var reportTimeout = function() {
    $analytics.eventTrack('locateTimeout', { category: 'device' });
  };

  var waitForEncryptionKey = function() {
      $timeout(function() {
        reportTimeout();
        $scope.encryptionKeyTimeout = true;
      }, 60000);
      SecureMessageService.ready().then(function() {
        // We got the encryption key, send the GCM message
        $scope.havePassword = true;
        $scope.haveEncryptionKey = true;
        $scope.encryptionKeyTimeout = false;
        SecureMessageService.sendGCM(deviceKey, {command: 'begin_locate'});
      }, function() {
        // Something went wrong.  Most likely the password was entered incorrectly.
        $scope.plaintextPassword = undefined;
        $scope.authenticationFailure = true;
        $scope.haveLocation = false;
        $scope.havePassword = false;
        $scope.haveEncryptionKey = false;
        $scope.encryptionKeyTimeout = false;
      });
  };

  $scope.$on('secure_message:device_location', function(command, message) {
    // Report a successful locate to Google Analytics.  This does not send an personal information, just that it was successful.
    reportSuccessfulLocate();

    // Make sure it is for the right device
    if (deviceKey != message.device.id) return;

    // Update the scope with the new device record
    $scope.device = message.device;

    $scope.$apply(function() {
      $scope.haveLocation = true;
    });
    $scope.map.redraw();
    $scope.map.updateMarker(message.latitude, message.longitude);
    $scope.map.updateCircle(message.latitude, message.longitude, parseInt(message.accuracy, 10) || 0);
    $scope.map.fitCircle();
  });
};

var DeviceWipeController = function($scope, $routeParams, $http, $timeout, API_BASE, Device, SecureMessageService) {
  // Setup scope variables
  var deviceKey = $routeParams.device_id;
  $scope.device = Device.get({'id': deviceKey});

  // Reset the view
  $scope.wipeStarted = false;
  $scope.haveEncryptionKey = false;
  $scope.havePassword = false;
  $scope.encryptionKeyTimeout = false;

  // Hook up the authenticate method to the scope
  $scope.authenticate = function() {
    $scope.havePassword = true;
    SecureMessageService.openChannel().then(function() {
      SecureMessageService.sendPublicKey(deviceKey, $scope.plaintextPassword);
      waitForEncryptionKey();
    });
  };

  var reportSuccessfulWipe= _.once(function() {
    $scope.$apply(function() {
      $analytics.eventTrack('wipeSuccess', { category: 'device' });
    });
  });

  var reportTimeout = function() {
    $analytics.eventTrack('wipeTimeout', { category: 'device' });
  };

  var waitForEncryptionKey = function() {
      $timeout(function() {
        $scope.encryptionKeyTimeout = true;
        reportTimeout();
      }, 60000);
      SecureMessageService.ready().then(function() {
        // We got the encryption key, send the GCM message
        $scope.havePassword = true;
        $scope.haveEncryptionKey = true;
        $scope.encryptionKeyTimeout = false;
        SecureMessageService.sendGCM(deviceKey, {command: 'begin_wipe'});
      }, function() {
        // Something went wrong.  Most likely the password was entered incorrectly.
        $scope.plaintextPassword = undefined;
        $scope.authenticationFailure = true;
        $scope.wipeStarted = false;
        $scope.havePassword = false;
        $scope.haveEncryptionKey = false;
        $scope.encryptionKeyTimeout = false;
      });
  };

  $scope.$on('secure_message:wipe_started', function(command, message) {
    // Report the wipe as successful to Google Analytics.  This does not send any personal information.
    reportSuccessfulWipe();

    // Make sure it is for the right device
    if (deviceKey != message.device.id) return;

    // Update the scope with the new device record
    $scope.device = message.device;

    $scope.$apply(function() {
      $scope.wipeStarted = true;
    });
  });
};

var DeviceRemoveController = function($rootScope, $scope, $routeParams, $location, $timeout, $analytics, Device) {
  // Setup scope variables
  var deviceKey = $routeParams.device_id;
  $scope.device = Device.get({'id': deviceKey});

  $scope.remove = function() {
    logging.info("DeviceRemoveController: Removing device from account");
    Device.remove({ device_key: deviceKey }, function(response) {
      if (!response.errors) {
        // Report the device removal to Google Analytics.  This does not send any personal information.
        $analytics.eventTrack('deviceRemoved', { category: 'device' });

        // We are so fast, that if we navigate back immediately, the device will still show up.
        // Set a timeout and change the route after the timeout expires, also set polling so it looks like the page is still loading.
        $rootScope.polling = true;
        $timeout(function() {
          $rootScope.polling = false;
          $location.path('/devices');
        }, 500);
      } else {
        $scope.removeError = true;
      }
    });
  };
};

var AccountController = function($scope, Account, AuthService, TokenService) {
  $scope.model = {};
  $scope.changePassword = function() {
    Account.change_password({
      'current_password': Util.doubleHash($scope.model.password),
      'new_password': Util.doubleHash($scope.model.newPassword)
    }, function(response) {
      if (response.success) {
        TokenService.invalidateToken();
        $scope.success = true;
        $scope.model = {};
        $scope.form.$setPristine();
      } else {
        if (Util.matchError(response.errors, 2)) $scope.invalidPassword = true;
      }
    });
  };
};

_.extend(cmid, {
  RegisterController: RegisterController,
  LoginController: LoginController,
  DevicesController: DevicesController,
  AccountPasswordResetController: AccountPasswordResetController,
  DeviceFindController: DeviceFindController,
  DeviceWipeController: DeviceWipeController,
  DeviceRemoveController: DeviceRemoveController,
  AccountController: AccountController,
  AccountVerifyEmailController: AccountVerifyEmailController
});
