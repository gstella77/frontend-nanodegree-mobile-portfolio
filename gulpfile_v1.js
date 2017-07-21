// ////////////////////////////////////////////////
// Required tasks
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin');

// Start browserSync server
gulp.task('browser-Sync', function() {
    browserSync({
      server: {
        baseDir: 'dist'
      }
    })
})

// ////////////////////////////////////////////////
// Scripts
// Styles
// HTML
// use globes to minify and match the files onto the target folder
// // /////////////////////////////////////////////

gulp.task('scripts', function(){
    gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    gulp.src(['src/views/js/**/*.js', '!src/views/js/**/*.min.js'])
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'))

    .pipe(reload({stream:true}));
})

gulp.task('styles', function(){
     gulp.src(['src/css/**/*.css', '!src/css/**/*.min.css'])
    .pipe(rename({suffix:'.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))

    gulp.src(['src/views/css/**/*.css', '!src/views/css/**/*.min.css'])
    .pipe(rename({suffix:'.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/views/css'))

    .pipe(browserSync.reload({stream: true}));
})

gulp.task('html', function(){
    gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('dist/'))

    gulp.src(['src/views/**/*.html'])
    .pipe(gulp.dest('dist/views/'))

    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function(){
    gulp.src(['src/img/**/*.+(png|jpg|gif|svg)'])
    .pipe(imagemin({
       optimizationLevel: 5
    }))
    .pipe(gulp.dest('dist/img'))

    gulp.src(['src/views/images/**/*.+(png|jpg|gif|svg)'])
    .pipe(imagemin({
       optimizationLevel: 3
    }))
    .pipe(gulp.dest('dist/views/images'))

    .pipe(reload({stream:true}));
});



// ////////////////////////////////////////////////
// Watch
// // /////////////////////////////////////////////

gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/views/css/**/*.css', ['styles']);
    gulp.watch('src/css/**/*.css', ['styles']);
    gulp.watch('src/views/**/*.html', ['html']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/views/images/**/*', ['images']);
});

// ////////////////////////////////////////////////
// Deafult Task
// // /////////////////////////////////////////////

gulp.task('default', ['scripts', 'styles', 'html', 'images', 'browser-Sync','watch',]);
