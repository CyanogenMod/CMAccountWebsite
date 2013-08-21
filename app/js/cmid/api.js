var apiModule = angular.module('cmid.api', ['ngResource']);
// TODO: Use a provider instead of factories, so we can configure it.
apiModule.constant('API_BASE', '/api/v1');

apiModule.service("TokenService", function($rootScope, $q, $location, API_BASE) {
  var service = {};
  var accessToken = null;
  var tokenExpiry = null;

  var pendingTokenRequest = false;
  var tokenQueue = [];

  var invalidateToken = function() {
    logging.debug("TokenService: Invalidating token");
    accessToken = null;
    tokenExpiry = null;
  };

  service.invalidateToken = invalidateToken;

  service.getToken = function(http) {
    if (accessToken) {
      logging.debug("TokenService: Using cached token:", accessToken);
      return $q.when(accessToken);
    }

    var dfd = $q.defer();
    // If another request is in progress, queue the deferred to be resolved when the request is completed.
    if (pendingTokenRequest) {
      logging.info("TokenService: There is another token request in progress, queueing deferred");
      tokenQueue.push(dfd);
      return dfd.promise;
    }

    pendingTokenRequest = true;
    logging.info("TokenService: Starting token request");
    var tokenRequest = http.get(API_BASE + '/auth/token?client_id=5488762045857792');

    var errorCallback = function(error) {
      pendingTokenRequest = false;
      logging.error("TokenService: Error obtaining token!", error);
      dfd.reject();
      $location.path('/login');
    };

    tokenRequest.success(function(response) {
      if (!response.errors) {
        pendingTokenRequest = false;
        accessToken = response.access_token;
        tokenExpiry = (response.expires_in - 60) * 1000;
        $rootScope.authenticated = true;
        logging.debug("TokenService: Got token:", accessToken);

        // Schedule token expiration
        logging.debug("TokenService: Scheduling token expiration in", (tokenExpiry/1000), "seconds");
        setTimeout(invalidateToken, tokenExpiry);

        dfd.resolve(accessToken);

        // Resolve any other deferreds that are waiting for a token
        angular.forEach(tokenQueue, function(tokenPromise) {
          tokenPromise.resolve(accessToken);
        });
      } else {
        errorCallback(response.errors);
      }
    });

    tokenRequest.error(errorCallback);
    return dfd.promise;
  };

  return service;
});

apiModule.service("AuthService", function($http, $timeout, $q, API_BASE, TokenService) {
  this.logout = function(successCallback) {
    var promise = $http.get(API_BASE + '/auth/signout').success(successCallback);
    TokenService.invalidateToken();
    return promise;
  };

  this.signin = function(params) {
    var dfd = $q.defer();
    var request = $http.post(API_BASE + '/auth/signin', params);
    request.success(function(result) {
      if (result.errors) {
        dfd.reject(result.errors);
      } else {
        dfd.resolve(result);
      }
    });
    return dfd.promise;
  };
});

apiModule.factory("Account", function($resource, API_BASE, $http, TokenService) {
  var service = $resource(API_BASE + '/account/:action',
    { action: '@action' },
    {
      register: { method: 'POST', params: { action: 'register' } },
      available: { method: 'GET', params: { action: 'available' } },
      initiate_password_reset: { method: 'GET', params: { action: 'initiate_password_reset' } },
      reset_password: { method: 'POST', params: { action: 'reset_password' } },
      resend_verify_email: { method: 'POST', params: { action: 'resend_verify_email' } },
      verify_email: { method: 'POST', params: { action: 'verify_email' } },

      get: { method: 'GET', params: { action: 'get' }, requireToken: true },
      change_password: { method: 'POST', params: { action: 'change_password' }, requireToken: true },
    });
  return service;
});

apiModule.factory("Device", function($resource, API_BASE) {
  var service = $resource(API_BASE + '/device/:action',
    { action: '@action' },
    {
      list: { method: 'GET', params: { action: 'list' }, isArray: true, requireToken: true },
      get: { method: 'GET', params: { action: 'get' }, requireToken: true },
      remove: { method: 'POST', params: { action: 'remove' }, requireToken: true },
    });
  return service;
});
