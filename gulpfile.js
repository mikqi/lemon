const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

gulp.task('sass', () => {
  return gulp.src('./src/lemon.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
})

gulp.task('sass:watch', () => {
  gulp.start('sass');
  return watch('./src/**/*.scss', () => {
    gulp.start('sass');
  });
})
