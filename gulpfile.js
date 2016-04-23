'use strict';

let gulp        = require('gulp');
let stylus      = require('gulp-stylus');
let sourcemaps  = require('gulp-sourcemaps');
let plumber     = require('gulp-plumber');
let concat      = require('gulp-concat');
let uglify      = require('gulp-uglify');
let bootstrap   = require('bootstrap-styl');
let rupture     = require('rupture');
let copy        = require('gulp-copy2');
let browserSync = require('browser-sync').create();

/*
  Prepare the paths
*/
let paths = {
  stylus    : `./css/dev`,
  css       : `./css`,
  js        : `./js`,
  vendor    : `./js/vendor`
}

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./js/*.js').on('change', browserSync.reload);
})

/*
  Stylus compile
*/
gulp.task('stylus-compile', () => {
  return gulp.src([`${paths.stylus}/*.styl`, `!${paths.stylus}/**/_*.styl`, `!${paths.stylus}/variables.styl`])
    .pipe(plumber())
    .pipe(stylus({
      use: [bootstrap(), rupture()],
      compress: true
    }))
    .pipe(gulp.dest(`${paths.css}`))
    .pipe(browserSync.stream());
});

/*
  Get the bootstrap-styl js files and concat/uglify them
*/
gulp.task('bootstrap-build', () => {
  return gulp.src([
    'node_modules/bootstrap-styl/js/transition.js',
    'node_modules/bootstrap-styl/js/alert.js',
    'node_modules/bootstrap-styl/js/button.js',
    'node_modules/bootstrap-styl/js/carousel.js',
    'node_modules/bootstrap-styl/js/collapse.js',
    'node_modules/bootstrap-styl/js/dropdown.js',
    'node_modules/bootstrap-styl/js/modal.js',
    'node_modules/bootstrap-styl/js/tooltip.js',
    'node_modules/bootstrap-styl/js/popover.js',
    'node_modules/bootstrap-styl/js/scrollspy.js',
    'node_modules/bootstrap-styl/js/tab.js',
    'node_modules/bootstrap-styl/js/affix.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('bootstrap.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(`${paths.vendor}`));

});

/*
  Get the js assets from NPM
*/
gulp.task('js-copy', () => {
  let dirs = [
    { src: 'node_modules/jquery/dist/jquery.min.js', dest: `${paths.vendor}/jquery.min.js` },
    { src: 'node_modules/sweet-scroll/sweet-scroll.min.js', dest: `${paths.vendor}/sweet-scroll.min.js` },
  ]
    return copy(dirs);
});

/*
  Watch
*/
gulp.task('watch', () => {
  gulp.watch(`${paths.stylus}/*.styl`, ['stylus-compile']);
});

gulp.task('default', ['bootstrap-build', 'js-copy', 'serve', 'watch']);