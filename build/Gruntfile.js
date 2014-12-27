'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    target: '../assets',

    // package options
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js'
      ]
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts',
        src: ['**'],
        dest: '<%= target %>/fonts'
      },
    },

    less: {
      production: {
        options: {
          cleancss: false
        },
        files: {
          '<%= target %>/css/stylesheet.css': 'assets/css/stylesheet.less'
        }
      }
    },

    uglify: {
      build: {
        files: {
          '<%= target %>/js/plugins.js': [
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/alert.js',
            'bower_components/bootstrap/js/button.js',
            //'bower_components/bootstrap/js/carousel.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            //'bower_components/bootstrap/js/modal.js',
            //'bower_components/bootstrap/js/tooltip.js',
            //'bower_components/bootstrap/js/popover.js',
            //'bower_components/bootstrap/js/scrollspy.js',
            'bower_components/bootstrap/js/tab.js',
            //'bower_components/bootstrap/js/affix.js'
          ]
        }
      }
    },

    imagemin: {
      assets: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= target %>/img'
        }]
      }
    },

    clean: {
      dist: [
        'tmp/**',
        '<%= target %>/img/**'
      ]
    },

    watch: {
      css: {
        files: ['assets/css/**'],
        tasks: ['less'],
        options: {
          livereload: true,
          atBegin: true
        }
      },
      js: {
        files: ['assets/js/**'],
        tasks: ['uglify'],
        options: {
          livereload: true,
          atBegin: true
        }
      },
      imagemin: {
        files: ['assets/img/**'],
        tasks: ['imagemin'],
        options: {
          livereload: true,
          atBegin: true
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register default tasks
  grunt.registerTask('default', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'copy', 'less', 'uglify', 'imagemin'
  ]);
};
