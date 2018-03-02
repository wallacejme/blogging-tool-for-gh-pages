const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const es = require('event-stream');

gulp.task('clean', () => {
  return gulp.src(['build/', 'docs/'], { read: false })
    .pipe(clean());
});

gulp.task('organizeCustomStyle', () => {
  return gulp.src('css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('organizeCustomScripts', () => {
  return gulp.src('js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('organizeCSSLibs', () => {
  return gulp.src('node_modules/normalize-css/normalize.css')
    .pipe(concat('modules.css'))
    .pipe(gulp.dest('build/libs/css'));
});

gulp.task('organizeJSLibs', () => {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('build/libs/js'));
})

gulp.task('organizeCSS', ['organizeCustomStyle', 'organizeCSSLibs']);
gulp.task('organizeScripts', ['organizeCustomScripts', 'organizeJSLibs']);

gulp.task('build', ['organizeCSS', 'organizeScripts']);

gulp.task('publish', () => {
  return es.merge([
      gulp.src(['index.html', 'pages/**/*', 'posts/**/*', 'img/**/*'], { base: '.' }),
      gulp.src('build/**/*.css', { base: '.' }),
      gulp.src('build/**/*.js', { base: '.' })
    ])
    .pipe(gulp.dest('docs/'));
});

var watcher = gulp.watch(['index.html', 'js/**/*.js', 'css/**/*.css'], ['build']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task('default', () => {
  return runSequence('clean', 'build', 'publish');
});