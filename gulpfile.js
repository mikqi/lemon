const gulp         = require('gulp');
const sass         = require('gulp-sass');
const watch        = require('gulp-watch');
const postcss      = require('gulp-postcss');
const cssnano      = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename       = require('gulp-rename');

gulp.task('sass', () => {
  return gulp.src('./src/lemon.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 5 version'],
      })
    ]))
    .pipe(gulp.dest('./dist')) // unminified version
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 5 version'],
      }),
      cssnano(),
    ]))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('./dist')) // minified version
    .pipe(gulp.dest('./docs/assets')) // docs
})

gulp.task('watch', gulp.series('sass', () => {
  watch('./src/**/*.scss', gulp.series('sass'));
}))
