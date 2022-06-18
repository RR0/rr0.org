// Karma configuration
// Generated on Sun Aug 31 2014 23:47:07 GMT+0200 (CEST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/traceur-runtime/traceur-runtime.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-i18n/angular-locale_fr-fr.js',
      'node_modules/karma-jasmine/**/*.js',
      'rr0.js',
      'test/**/*Spec.js'
    ],

    // list of files to exclude
    exclude: [
      'bower_components/**/tests/*.*',
      'node_modules/**/tests/*.*'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      '**/*.js': ['coverage'],
      '!bower_components/**/*': ['coverage'],
      '!node_modules/**/*': ['coverage'],
      '!test/**/*': ['coverage']
    },

    coverageReporter: {
      dir: 'test/coverage/',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcovonly', subdir: 'lcov'}
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Firefox only is available on Travis VM : https://docs.travis-ci.com/user/gui-and-headless-browsers/
    // Current PhantomJS versions fail with traceur : https://github.com/google/traceur-compiler/issues/908
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
