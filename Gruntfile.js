module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      all: { files: [{ src: [ 'dist/*' ]}] }
    },

    useminPrepare: {
      html: ['app/index.html'],
      options: { dest: 'dist/' },
    },

    copy: {
      all: { files: [
        { expand: true, cwd: 'app/', src: 'index.html', dest: 'dist/' },
        { expand: true, cwd: 'app/', src: 'partials/**/*.html', dest: 'dist/' }
      ]}
    },

    ngmin: {
      all: {
        files: [{
          expand: true,
          cwd: 'dist/js',
          src: 'app.js',
          dest: 'dist/js'
        }]
      }
    },

    less: {
      options: { yuicompress: true, paths: ['app/less'] },
      all: { files: { "dist/css/app.css": "app/less/cmid.less" } }
    },

    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: 'app/img',
          src: '*.{png,jpg,jpeg}',
          dest: 'dist/img'
        }]
      }
    },

    usemin: {
      html: ['dist/index.html'],
      options: { dirs: ['dist/'] }
    },
  });

  // Task for building the chrome extension
  grunt.registerTask('build:chrome', [
    'clean',
    'useminPrepare',
    'copy',
    'concat',
    'ngmin',
    'less',
    'imagemin',
    'usemin',
  ]);
};
