// ////////////////////////////////////////////////
// Required tasks
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    htmlreplace = require('gulp-html-replace'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    gulpIf = require('gulp-if'),
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
// useref is AWESOME - simplify and saves lines of code!!
// useref: Added Build tags in HTML files to update js and css file name with .min,
// then uglify, minifycss, and copy the html content into my Dist folder
// Used globes to minify and match the files onto the target folder
// // /////////////////////////////////////////////

gulp.task('useref', function() {
    gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('dist'));

     gulp.src('src/views/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('dist/views/'))

    .pipe(reload({stream:true}));
});


// copy the html content into our Dist folder


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
    gulp.watch('src/**/*.js', ['useref']);
    gulp.watch('src/js/**/*.js', ['useref']);
    gulp.watch('src/views/css/**/*.css', ['useref']);
    gulp.watch('src/css/**/*.css', ['useref']);
    gulp.watch('src/views/**/*.html', ['useref']);
    gulp.watch('src/**/*.html', ['useref']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/views/images/**/*', ['images']);
});

// ////////////////////////////////////////////////
// Deafult Task
// // /////////////////////////////////////////////

gulp.task('default', ['useref', 'images', 'browser-Sync','watch',]);
