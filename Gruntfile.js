var lrSnippet = require('connect-livereload')();
var proxySnippet = function(req, res, options) {
  req.headers.host = 'account.cyanogenmod.org';
  require('grunt-connect-proxy/lib/utils').proxyRequest(req, res, options);
};
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var querystring = require('querystring');
var requestId = 0;

// quick and dirty function for helping debug proxied requests to a local CMIdServer
var trafficDebugger = function(req, res, next) {
    var currentReqId = requestId++;
    // log request data
    if (req.method == 'POST') {
        body = ""
        // collect the data, this is DEBUG code only in production someone could blow up your memory with a huge request
        req.on('data', function(data) {
          body += data;
        });
        req.on('end', function() {
          console.log(new Date() + " - Request Received - Id: " + currentReqId + " " + req.method + " " + req.url + " " + req.httpVersion +
                      " headers " + JSON.stringify(req.headers) + " body: " + JSON.stringify(querystring.parse(body)));
        });
     }
     else {
        console.log(new Date() + " - Request Received - Id: " + currentReqId + " " + req.method + " " + req.url + " " + req.httpVersion + " headers " + JSON.stringify(req.headers));
     }

     // log the response data
     res.on('finish', function () {
        console.log(new Date() + " - Response sent - Id: " + currentReqId + " statusCode: " + res.statusCode +  " headers: " + JSON.stringify(res._headers));
     });

     // pass control to the next middleware layer
     next();
}


module.exports = function(grunt) {
  // Load everything from package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      options: { livereload: true },
      dev: { files: [
        'app/**/*.js',
        'app/**/*.html'
      ]}
    },
    
    connect: {
      rules: {
        '^/bower_components/(.*)$': '/bower_components/$1',
        '^/static/js/angular-i18n/(.*)$': '/bower_components/angular/i18n/$1',
        '^/static/(.*)$': '/app/$1',
        '^/.*$': '/app/index.html'
      },
      local: {
        options: {
          hostname: '*',
          port: 8181,
          middleware: function(connect) {
            return [
              trafficDebugger,
              proxySnippet,
              rewriteRulesSnippet,
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        },
        proxies: [{
          context: '/api',
          host: '0.0.0.0',
          port: 8080
        },
        {
          context: '/oauth2',
          host: '0.0.0.0',
          port: 8080
        },
        {
          context: '/_ah',
          host: '0.0.0.0',
          port: 8080
        }]
      },
      remote: {
        options: {
          port: 8080,
          middleware: function(connect) {
            return [
              proxySnippet,
              rewriteRulesSnippet,
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        },
        proxies: [{
          context: '/api',
          host: 'account.cyanogenmod.org',
          port: 443,
          https: true
        },
        {
          context: '/_ah',
          host: 'account.cyanogenmod.org',
          port: 443,
          https: true
        }]
      }
    }
  });

  grunt.registerTask('server', [
    'configureProxies:remote',
    'configureRewriteRules',
    'connect:remote',
    'watch:dev'
  ]);

  grunt.registerTask('devserver', [
    'configureProxies:local',
    'configureRewriteRules',
    'connect:local',
    'watch:dev'
  ]);
};
