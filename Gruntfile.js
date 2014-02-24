var lrSnippet = require('connect-livereload')();
var proxySnippet = function(req, res, options) {
  req.headers.host = 'cmid-devel.appspot.com';
  require('grunt-connect-proxy/lib/utils').proxyRequest(req, res, options);
};
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

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
          port: 8181,
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
          host: 'localhost',
          port: 8080
        },
        {
          context: '/_ah',
          host: 'localhost',
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
          host: 'cmid-devel.appspot.com',
          port: 443,
          https: true
        },
        {
          context: '/_ah',
          host: 'cmid-devel.appspot.com',
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
