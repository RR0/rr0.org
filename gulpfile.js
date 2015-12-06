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
var angularFilesort = require('gulp-angular-filesort');

var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');

gulp.task('clean', function () {
  'use strict';
  return del.sync(['dist/**/*']);
});

var exclusions = ['!node_modules/**/*', '!bower_components/**/*',
  '!test/**/*', '!coverage/**/*', '!karma*.*',
  '!gulpfile*.*', '!gruntfile*.*',
  '!server.js', '!rr0.js', '!dist/*.js'];

var jsSources = ['**/*.js'].concat(exclusions);

gulp.task('sass', function () {
  'use strict';
  return gulp.src(['**/*.scss'].concat(exclusions))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  'use strict';
  return gulp.src(jsSources)
    .pipe(es6())
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['clean', 'js', 'sass'], function () {
});

gulp.task('dist', ['compile'], function () {
  'use strict';

  return gulp.src('index2.html')
    .pipe(injectFiles(gulp.src(['dist/**/*.js']).pipe(angularFilesort())))
    .pipe(injectFiles(gulp.src(['dist/**/*.css'])))
    .pipe(usemin({
      css: [minifyCss(), rev()],
      html: [minifyHtml({empty: true})],
      js: [
        sourcemaps.init(),
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
