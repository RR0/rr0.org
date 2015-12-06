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
  return del(['dist/**/*']);
});

gulp.task('compile', ['clean'], function () {
  'use strict';
  return gulp.src([
      '**/*.scss',
      '!node_modules/**/*', '!bower_components/**/*', '!test/**/*'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

var sources = gulp.src([
  '**/*.js', 'dist/css/**/*',
  '!node_modules/**/*', '!bower_components/**/*',
  '!test/**/*', '!coverage/**/*', '!karma*.*',
  '!gulpfile*.*', '!gruntfile*.*',
  '!server.js', '!rr0.js', '!dist/*.js'
], {read: false});

gulp.task('dist', ['compile'], function () {
  'use strict';

  return gulp.src('index2.html')
    .pipe(injectFiles(sources))
    .pipe(usemin({
      css: [minifyCss(), rev()],
      html: [minifyHtml({empty: true})],
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
