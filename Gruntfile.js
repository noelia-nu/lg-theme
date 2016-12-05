'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

// Watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      compass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint', 'uglify:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'css/style.css',
          'js/*.js',
          'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
    },

    // Compass and scss
    compass: {
      options: {
        bundleExec: true,
        httpPath: '/',
        cssDir: 'css',
        sassDir: 'sass',
        imagesDir: 'img',
        javascriptsDir: 'js',
        fontsDir: 'fonts',
        assetCacheBuster: 'none',
        require: ['breakpoint']
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact',
          force: true
        }
      }
    },

    // Javascript linting with jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/src/*.js',
        '!js/src/*.min.js'
      ]
    },

    // Concat & minify
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true
        },
        files: {
          'js/lg_theme.js': [
            'js/src/*.js',
            '!js/src/*.min.js'
          ]
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/lg_theme.js': [
            'js/src/*.js',
            '!js/src/*.min.js'
          ]
        }
      }
    },

    //BrowserSync settings

    browserSync: {
      dev: {
        bsFiles: {
          src: 'css/style.css'
        },
        options: {
          watchTask: true,
          proxy: 'linux-graphics'
        }
      }
    },
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('build', [
    'jshint',
    'uglify:dist',
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'uglify:dev',
    'compass:dev',
    'browserSync',
    'watch'
  ]);

};