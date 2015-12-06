/* jshint node: true */

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var del = require('del');

var es6 = require('gulp-babel');
var sass = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var injectFiles = require('gulp-inject');

var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');

gulp.task('clean', function () {
  'use strict';
  return del(['dist','css']);
});

gulp.task('compile', function () {
  'use strict';
  gulp.src([
      '**/*.scss',
      '!node_modules/**/*', '!bower_components/**/*', '!test/**/*'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('inject', ['compile'], function () {
  'use strict';
  var target = gulp.src('index2.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    '**/*.js', 'css/**/*',
    '!node_modules/**/*', '!bower_components/**/*',
    '!test/**/*', '!coverage/**/*', '!karma*.*',
    '!gulpfile*.*', '!gruntfile*.*',
    '!server.js'
  ], {read: false});

  return target.pipe(injectFiles(sources))
    .pipe(gulp.dest('injected'));
});

gulp.task('dist', ['inject'], function () {
  'use strict';

  gulp.src('index2.html')
    .pipe(usemin({
      css: [minifyCss(), rev()],
      // html: [minifyHtml({empty: true})],
      js: [
        sourcemaps.init(),
        es6(),
        ngAnnotate(),
        uglify().on('error', gulpUtil.log),
        rev(),
        sourcemaps.write('.')
      ]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  'use strict';
  gulp.start('dist');
});
