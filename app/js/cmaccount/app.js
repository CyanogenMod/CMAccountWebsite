var cmaccountModule = angular.module('cmaccount', ['ngRoute', 'cmaccount.api', 'cmaccount.channel', 'cmaccount.maps', 'cmaccount.directives', 'angulartics', 'angulartics.ga', 'l10n', 'cmaccount.l10n']);

cmaccountModule.config(function($routeProvider, $locationProvider, $httpProvider, $injector) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'CMID Website';

  // Intercept http requests and responses, so we can show the loading widget.
  // We cannot inject $http here or it will cause a circular dependency, so
  // we inject an injector instead (yo dawg).
  $httpProvider.interceptors.push(function($q, $rootScope, $injector, $location, TokenService) {
    var $http;
    return {
      request: function(config) {
        $rootScope.polling = true;
        $http = $http || $injector.get('$http');

        var requestPromise = $q.defer();

        if (config.requireToken) {
          var tokenPromise = TokenService.getToken($http);
          tokenPromise.then(function(token) {
            config.headers.Authorization = "OAuth " + token;
            requestPromise.resolve(config);
          }, function(error) {
            requestPromise.reject({tokenError: true, data: {error: 'This request requires a token'}});
          });
        } else {
          requestPromise.resolve(config);
        }

        return requestPromise.promise;
      },
      response: function(response) {
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length === 0) {
          $rootScope.polling = false;
        }
        return response || $q.when(response);
      },
      responseError: function(response) {
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length === 0) {
          $rootScope.polling = false;
        }
        logging.error("HTTPInterceptor: Error during request:", response);
        if (response.status == 401) {
          TokenService.invalidateToken();
          $location.path('/login');
        }
        if (!response.tokenError) $rootScope.networkError = response;
        return response || $q.when(response);
      }
    };
  });

  // Transform datetimes in JSON to Date objects
  var JSON_START = /^\s*(\[|\{[^\{])/,
      JSON_END = /[\}\]]\s*$/,
      PROTECTION_PREFIX = /^\)\]\}',?\n/,
      DATE_MATCHER = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

  $httpProvider.defaults.transformResponse = [function(data) {
    if (angular.isString(data)) {
      data = data.replace(PROTECTION_PREFIX, '');
      if (JSON_START.test(data) && JSON_END.test(data)) {
        data = JSON.parse(data, function(key, val) {
          if (DATE_MATCHER.test(val)) {
            return new Date(val);
          }
          return val;
        });
      }

      return data;
    }
  }];
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/register', {
      templateUrl: '/static/partials/register.html',
      controller: CMAccount.RegisterController,
    })
    .when('/login', {
      templateUrl: '/static/partials/login.html',
      controller: CMAccount.LoginController,
    })
    .when('/devices', {
      templateUrl: '/static/partials/devices.html',
      controller: CMAccount.DevicesController,
      resolve: CMAccount.DevicesController.resolve
    })
    .when('/device/:device_id/find', {
      templateUrl: '/static/partials/device/find.html',
      controller: CMAccount.DeviceFindController,
    })
    .when('/device/:device_id/wipe', {
      templateUrl: '/static/partials/device/wipe.html',
      controller: CMAccount.DeviceWipeController,
    })
    .when('/device/:device_id/alert', {
      templateUrl: '/static/partials/device/alert.html',
      controller: CMAccount.DeviceAlertController,
    })
    .when('/device/:device_id/remove', {
      templateUrl: '/static/partials/device/remove.html',
      controller: CMAccount.DeviceRemoveController,
    })
    .when('/account', {
      templateUrl: '/static/partials/account.html',
      controller: CMAccount.AccountController,
    })
    .when('/account/password_reset', {
      templateUrl: '/static/partials/account/password_reset.html',
      controller: CMAccount.AccountPasswordResetController,
    })
    .when('/help', {
      templateUrl: '/static/partials/help.html',
    })
    .otherwise({ redirectTo: '/devices' });
});

cmaccountModule.run(function($rootScope, $route, $location, AuthService, API_BASE) {
  $rootScope.logout = function() {
    AuthService.logout(function(response) {
      $rootScope.authenticated = false;
      $location.path('/login');
    });
  };
  $rootScope.md5 = Util.md5;

  $rootScope.locale = _.extend(window.locale, {
    set: function(code) {
      $rootScope.locale.current = code;
      localStorage.setItem('locale', JSON.stringify({locale: code}));
      location.reload();
    }
  });

  window.sl = $rootScope.locale.set;
});
