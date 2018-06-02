const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

var plugins = [
  autoprefixer({ browsers: ['last 10 version'] }),
  cssnano(),
];

gulp.task('sass', () => {
  return gulp.src('./src/lemon.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 1 version'] })]))
    .pipe(gulp.dest('./dist')) //unminified
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist')) // minified
})

gulp.task('sass:watch', () => {
  gulp.start('sass');
  return watch('./src/**/*.scss', () => {
    gulp.start('sass');
  });
})
