/* jshint node: true */

"use strict";
module.exports = function (grunt) {

  grunt.initConfig(
    {
      pkg: grunt.file.readJSON('package.json'),
      traceur: {
        options: {
          sourceMaps: true
        },
        custom: {
          files: [
            {
              src: ['js/common.js'],
              dest: 'js/common.es5.js'
            },
            {
              src: ['js/rr0-value.js'],
              dest: 'js/rr0-value.es5.js'
            },
            {
              src: ['js/note/cite/book/rr0-book.js'],
              dest: 'js/note/cite/book/rr0-book.es5.js'
            },
            {
              src: ['js/net.js'],
              dest: 'js/net.es5.js'
            },
            {
              src: ['js/lang.js'],
              dest: 'js/lang.es5.js'
            },
            {
              src: ['js/nav/nav.js'],
              dest: 'js/nav/nav.es5.js'
            },
            {
              src: ['js/nav/rr0-outline.js'],
              dest: 'js/nav/rr0-outline.es5.js'
            },
            {
              src: ['js/nav/HeadController.js'],
              dest: 'js/nav/HeadController.es5.js'
            },
            {
              src: ['js/context-service.js'],
              dest: 'js/context-service.es5.js'
            },
            {
              src: ['js/nav/nav-service.js'],
              dest: 'js/nav/nav-service.es5.js'
            },
            {
              src: ['js/nav/rr0-a.js'],
              dest: 'js/nav/rr0-a.es5.js'
            },
            {
              src: ['js/nav/rr0-img.js'],
              dest: 'js/nav/rr0-img.es5.js'
            },
            {
              src: ['js/nav/rr0-link.js'],
              dest: 'js/nav/rr0-link.es5.js'
            },
            {
              src: ['js/nav/rr0-title.js'],
              dest: 'js/nav/rr0-title.es5.js'
            },
            {
              src: ['people/people.js'],
              dest: 'people/people.es5.js'
            },
            {
              src: ['people/people-service.js'],
              dest: 'people/people-service.es5.js'
            },
            {
              src: ['people/rr0-people.js'],
              dest: 'people/rr0-people.es5.js'
            },
            {
              src: ['people/rr0-meta.js'],
              dest: 'people/rr0-meta.es5.js'
            },
            {
              src: ['people/rr0-copyright.js'],
              dest: 'people/rr0-copyright.es5.js'
            },
            {
              src: ['time/time.js'],
              dest: 'time/time.es5.js'
            },
            {
              src: ['time/moment.js'],
              dest: 'time/moment.es5.js'
            },
            {
              src: ['time/duration.js'],
              dest: 'time/duration.es5.js'
            },
            {
              src: ['time/time-service.js'],
              dest: 'time/time-service.es5.js'
            },
            {
              src: ['time/rr0-time.js'],
              dest: 'time/rr0-time.es5.js'
            },
            {
              src: ['place/place.js'],
              dest: 'place/place.es5.js'
            },
            {
              src: ['place/rr0-place.js'],
              dest: 'place/rr0-place.es5.js'
            },
            {
              src: ['js/note/foot.js'],
              dest: 'js/note/foot.es5.js'
            },
            {
              src: ['js/index.js'],
              dest: 'js/index.es5.js'
            },
/*            {
              src: ['js/head/rr0-head.js'],
              dest: 'js/head/rr0-head.es5.js'
            },*/
            {
              src: ['js/search/search-service.js'],
              dest: 'js/search/search-service.es5.js'
            },
            {
              src: ['js/search/rr0-search.js'],
              dest: 'js/search/rr0-search.es5.js'
            },
            {
              src: ['js/units.js'],
              dest: 'js/units.es5.js'
            },
            {
              src: ['js/social/social.js'],
              dest: 'js/social/social.es5.js'
            },
            {
              src: ['js/social/fb/rr0-fb-like.js'],
              dest: 'js/social/fb/rr0-fb-like.es5.js'
            },
            {
              src: ['js/social/rr0-tweet.js'],
              dest: 'js/social/rr0-tweet.es5.js'
            },
            {
              src: ['js/social/rr0-gplus.js'],
              dest: 'js/social/rr0-gplus.es5.js'
            },
            {
              src: ['time/1/9/7/7/Poher_Matrice/matrix.js'],
              dest: 'time/1/9/7/7/Poher_Matrice/matrix.es5.js'
            }
          ]
        }
      },
//            docular: {
//                groups: [],
//                showDocularDocs: true,
//                showAngularDocs: true,
//                docular_webapp_target: 'doc'
//            },
      sass: {
        dist: {
          options: {
            //          outputStyle: 'compressed',
            //        style: 'compressed'
          },
          expand: true,
//                    files: {
//                        '/rr0.css': ['*.scss', 'js/**/*.scss', 'time/*.scss', 'people/*.scss', 'place/*.scss', 'iconic/iconic_fill.css']
//                    }
          src: ['**/*.scss'],
          ext: '.css'
        },
        dev: {
          options: {
            style: 'expanded',
            debugInfo: true,
            lineNumbers: true
          },
          expand: true,
          src: ['**/*.scss'],
          ext: '.css'
        }
      },
      autoprefixer: {
        options: {
          browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9']
        },
        multiple_files: {
          expand: true,
          flatten: true,
          src: '*.css'
        }
      },
      ngAnnotate: {
        options: {
          singleQuotes: true
        },
        rr0: {
          files: {
            expand: true,
            src: ['/js/time.es5.js'],
            ext: '.annotated.js'
          }
        }
      },
      jshint: {
        all: [
          "gruntfile.js",
          "js/**/*.js",
          "spec/**/*.js"
        ]
      },
      jasmine: {
        /* As this is launch for dev only, we rely on non-merged files here */
        src: [
          'js/common.es5.js', 'js/net.es5.js', 'js/lang.es5.js', 'js/nav.es5.js', 'people/people.es5.js',
          'time/time.es5.js', 'place/place.es5.js', 'js/note/foot.es5.js',
          'js/index.es5.js', 'js/search/search.es5.js', 'js/units.es5.js'
        ],
        options: {
          specs: 'test/**/*.js',
          vendor: 'bower_components/**/*.js',
          helpers: [
            'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.1/**/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.js',
            'bower_components/angular-nanoscroller/scrollable.js'
          ]
          //template: 'custom.tmpl',
        }
      },
      karma: {
        dist: {
          configFile: 'karma.conf.js',
          singleRun: true
        },
        dev: {
          configFile: 'karma.dev.conf.js'
        }
      },
      imagemin: {                          // Task
        static: {                          // Target
          options: {                       // Target options
            optimizationLevel: 7
          },
          files: {                         // Dictionary of files
            'time/1/9/5/0/06/08/TelephoneRegister.jpg': 'time/1/9/5/0/06/08/TelephoneRegister.jpg', // 'destination': 'source'
            'place/systeme/solaire/planete/terre/Apollo.jpg': 'place/systeme/solaire/planete/terre/Apollo.jpg',
            'org/us/ic/nsa/nsa-place.jpg': 'org/us/ic/nsa/nsa-place.jpg',
            'people/a/AdamsWilliamA/portrait.jpg': 'people/a/AdamsWilliamA/portrait.jpg',
            'croyance/conspirationnisme/TireursDeFicelles.jpg': 'croyance/conspirationnisme/TireursDeFicelles.jpg',
            'people/p/PersingerMichaelA/p040-15.jpg': 'people/p/PersingerMichaelA/p040-15.jpg',
            'tech/aero/appareil/avion/sr71/SR-71_NASA.jpg': 'tech/aero/appareil/avion/sr71/SR-71_NASA.jpg'
          }
        }
      },
      useminPrepare: {
        html: ['footer-end.src.html'],
        css: ['header-start.src.html']
      },
      usemin: {
        html: ['footer-end.html'],
        css: ['header-start.html']
      }
    }
  )
  ;
//grunt.loadNpmTasks('grunt-docular');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('test-dist', ['karma:dist']);
  grunt.registerTask('test-dev', ['karma:dev']);
  grunt.registerTask('test-unit', ['jasmine']);
  grunt.registerTask('css-dev', ['sass:dev', 'autoprefixer']);
  grunt.registerTask('css-dist', ['sass:dist', 'autoprefixer']);

  grunt.registerTask('dev', [
    'traceur',
    'css-dev',
    'test-dev'
  ]);
  grunt.registerTask('optim', [
    'imagemin:static'
  ]);
  grunt.registerTask('dist', [
    'traceur',
    'css-dist',
    'useminPrepare',
    //'concat',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    //'filerev',
    'usemin',
    'test-dist'
  ]);

  grunt.registerTask('default', ['dist']);
}
;