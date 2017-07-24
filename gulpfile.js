// ////////////////////////////////////////////////
// Required tasks to minify, optimize, copy and build
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    htmlclean = require('gulp-htmlclean')
    htmlmin = require('gulp-htmlmin'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    gulpIf = require('gulp-if'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
     cache = require('gulp-cache');

// Start browserSync server on the "dist" folder
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
      }
    })
})

// ////////////////////////////////////////////////
// useref is AWESOME - simplified and saved lines of code!!
// useref task: Add "build" tags in the HTML files to update
// js and css file extension names in the "dist" folder with .min extension
// then uglify, minifycss, and copy content into dist folder.
// Use globes to match css, js, and html "src" files to perform the tasks
// Use gulp-if to only minify if the file meets the extension criteria
// Use reload and set stream to true to update changes on the server
// // /////////////////////////////////////////////

gulp.task('useref', function() {
    gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.html', htmlmin({
        collapseWhitespace: true,
        removeComments:true
    })))
    .pipe(gulp.dest('dist'));

     gulp.src('src/views/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('*.html', htmlmin({
        collapseWhitespace: true,
        removeComments:true
    })))
    .pipe(gulp.dest('dist/views/'))
    .pipe(reload({stream:true}));
});

// Use imagein to optimize images into "dist" folder
gulp.task('images', function(){
    gulp.src(['src/img/**/*.+(png|jpg|gif|svg)'])
    .pipe(cache(imagemin({
        optimizationLevel: 5
    })))
    .pipe(gulp.dest('dist/img'))

    gulp.src(['src/views/images/**/*.+(png|jpg|gif|svg)'])
    .pipe(cache(imagemin({
        optimizationLevel: 3
    })))
    .pipe(gulp.dest('dist/views/images'))
    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Watch for file changes
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
// clean & build tasks adapted from https://css-tricks.com/gulp-for-beginners/
// // /////////////////////////////////////////////

// Set a clean task to delete the "dist" folder so we start with a fresh folder
// with minified files and optimized images after making edits to the source files
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
})

// Task Delete  everything on Dist folder except images
gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/views/images/**/*']);
});

// ////////////////////////////////////////////////
// Create "build" task and use runSequence to ensure "clean" task
// is completed before useref and images tasks.
// ////////////////////////////////////////////////
gulp.task('build', function(callback){
    runSequence('clean:dist',
        ['useref', 'images'],
        callback
    )
})

// ////////////////////////////////////////////////
// Run separate "default" task from "build" so we can build as needed
// Deafult Task loads browser-sync and watch for changes.
// use runSequence to ensure 'browser-sync' runs first then 'watch'
// ///////////////////////////////////////////////

gulp.task('default', function(callback) {
    runSequence(['browser-sync','watch'],
    callback
    )
})
