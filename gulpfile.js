const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const es = require('event-stream');

gulp.task('clean', () => {
  return gulp.src(['libs/', 'docs/'], { read: false })
    .pipe(clean());
});

gulp.task('organizeCSSLibs', () => {
  return gulp.src('node_modules/normalize-css/normalize.css')
    .pipe(gulp.dest('libs/css'));
});

gulp.task('organizeJSLibs', () => {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('libs/js'));
})

gulp.task('organizeLibs', ['organizeCSSLibs', 'organizeJSLibs']);

gulp.task('publish', () => {
  return es.merge([
      gulp.src([
        'index.html',
        'img/**/*',
        'css/**/*.css',
        'js/**/*.js',
        'libs/**/*',
      ], { base: './' } )
    ])
    .pipe(gulp.dest('docs/'));
});


gulp.task('default', () => {
	return runSequence('clean', 'organizeLibs', 'publish');
});