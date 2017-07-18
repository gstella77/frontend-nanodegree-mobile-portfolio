// ////////////////////////////////////////////////
// Required tasks
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

// ////////////////////////////////////////////////
// Scripts
// use globes to minify and match the files onto the target folder
// // /////////////////////////////////////////////

gulp.task('scripts', function(){
    gulp.src(['src/views/js/**/*.js', '!src/views/js/**/*.min.js'])
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'));
});

gulp.task('styles', function(){
  gulp.src(['src/views/css/**/*.css', '!src/views/css/**/*.min.css'])
  .pipe(rename({suffix:'.min'}))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/views/css'));
});

// ////////////////////////////////////////////////
// Watch
// // /////////////////////////////////////////////

gulp.task('watch', function(){
  gulp.watch('src/views/js/**/*.js', ['scripts']);
  gulp.watch('src/views/css/**/*.css', ['styles']);

});

// ////////////////////////////////////////////////
// Deafult Task
// // /////////////////////////////////////////////

gulp.task('default', ['scripts', 'styles', 'watch']);
