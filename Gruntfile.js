var lrSnippet = require('connect-livereload')();
var proxySnippet = function(req, res, options) {
  req.headers.host = 'account.cyanogenmod.org';
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
        '^/static/(.*)$': '/app/$1',
        '^/.*$': '/app/index.html'
      },
      dev: {
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

  grunt.registerTask('devserver', [
    'configureProxies:dev',
    'configureRewriteRules',
    'connect:dev',
    'watch:dev'
  ]);
};
