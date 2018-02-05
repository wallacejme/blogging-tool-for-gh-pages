const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const es = require('event-stream');

gulp.task('clean', () => {
  return gulp.src(['docs/'])
    .pipe(clean());
});

gulp.task('publish', () => {
  return es.merge([
      gulp.src('index.html'),
      gulp.src('img/**/*', { base: './' }),
      gulp.src('css/**/*.css', { base: './' }),
      gulp.src('js/**/*.js', { base: './' }),
      gulp.src('libs/**/*.css', { base: './' }),
      gulp.src('libs/**/*.js', { base: './' }),
      gulp.src(['node_modules/normalize-css/normalize.css',
                'node_modules/jquery/dist/jquery.min.js'], { base: './' })
    ])
    .pipe(gulp.dest('docs/'));
});

gulp.task('default', function () {
	return runSequence('clean', 'publish');
});