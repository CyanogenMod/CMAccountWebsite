var lrSnippet = require('connect-livereload')();
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // Load grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configuration
  grunt.initConfig({
    watch: {
      options: { livereload: true },
      dev: {
        files: [
          'appengine/static/**/*.js',
          //'appengine/static/**/*.less',
          'appengine/static/**/*.html'
        ]
      }
    },

    connect: {
      rules: {
        '^/bower_components/(.*)$': '/bower_components/$1',
        '^/static/(.*)$': '/appengine/static/$1',
        '^/.*$': '/appengine/static/index.html'
      },
      dev: {
        options: {
          port: 8181,
          hostname: '*',
          middleware: function(connect) {
            return [
              proxySnippet,
              lrSnippet,
              rewriteRulesSnippet,
              mountFolder(connect, '.')
            ];
          }
        },
        proxies: [{
          context: '/api',
          host: '127.0.0.1',
          port: 8080
        },
        {
          context: '/_ah',
          host: '127.0.0.1',
          port: 8080
        }]
      }
    },

    karma: {
      options: {
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        browsers: ['PhantomJS']
      }
    },

    clean: {
      dist: { files: [{ src: [ 'dist/*' ]}] }
    },

    useminPrepare: {
      html: ['appengine/static/index.html'],
      options: { dest: 'dist/' }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'appengine/', src: '*.yaml', dest: 'dist/' },
          { expand: true, cwd: 'appengine/', src: 'server.py', dest: 'dist/' },
          { expand: true, cwd: 'appengine/', src: 'cmid/**/*.py', dest: 'dist/' },
          { expand: true, cwd: 'appengine/lib', src: '**/*.py', dest: 'dist/lib/' },
          { expand: true, cwd: 'appengine/', src: 'static/favicon.ico', dest: 'dist/' },
          { expand: true, cwd: 'appengine/', src: 'static/index.html', dest: 'dist/' },
          { expand: true, cwd: 'appengine/', src: 'static/partials/**/*.html', dest: 'dist/' }
        ]
      }
    },

    ngmin: { dist: {
      files: [{
        expand: true,
        cwd: 'dist/static/js',
        src: 'cmid.js',
        dest: 'dist/static/js'
      }]
    } },

    uglify: {
      options: { mangle: false }
    },

    less: {
      options: {
        paths: ['appengine/static/less'],
        yuicompress: true
      },
      dist: {
        files: {
          "dist/static/css/app.css": "appengine/static/less/cmid.less"
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'appengine/static/img',
          src: '*.{png,jpg,jpeg}',
          dest: 'dist/static/img'
        }]
      }
    },

    rev: {
      dist: {
        files: { src: ['dist/static/js/*.js', 'dist/static/css/*.css'] }
      }
    },

    usemin: {
      html: ['dist/static/index.html'],
      options: { dirs: ['dist/static/'] }
    },

    targethtml: {
      dist: {
        files: {
          'dist/static/index.html': 'dist/static/index.html'
        }
      }
    }
  });

  grunt.registerTask('devserver', [
    'configureProxies:dev',
    'configureRewriteRules',
    'connect:dev',
    'watch:dev'
  ]);

  grunt.registerTask('test:e2e', [
    'configureRewriteRules',
    'configureProxies:dev',
    'connect:dev',
    'karma:e2e'
  ]);

  grunt.registerTask('test', ['test:e2e']);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'copy',
    'concat',
    'ngmin',
    'less',
    'imagemin',
    'rev',
    'usemin',
    'targethtml'
  ]);
};
