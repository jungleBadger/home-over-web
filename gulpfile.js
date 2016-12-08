/*jslint node: true, nomen:true*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        gutil = require('gulp-util'),
        watch = require('gulp-watch'),
        filter = require('gulp-filter'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        cssnano = require('cssnano'),
        cache = require('gulp-cache'),
        postcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        changed = require('gulp-changed'),
        supportedBrowsers = ['>0.1%'],
        processors = [
            autoprefixer({remove: false,
                browsers: supportedBrowsers
            }),
            cssnano()
        ];

    /**
     * This is the entry task for scaffolding.  It is called by npm after the module is installed, and is where you can ask questions
     * to collect additional info to generate the scaffold
     */

    gulp.task('build', ['browserify', 'watch']);


    gulp.task('browserify', function () {
        var production = gutil.env.type === 'production';

        return gulp.src(['client/scripts/main.js'], {read: false})

        // Browserify, and add source maps if this isn't a production build
            .pipe(browserify({
                debug: !production
            }))

            // Rename the destination file
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))

            // Output to the build directory
            .pipe(gulp.dest('client/dist/'));
    });

    gulp.task('watch', function() {
        gulp.watch('client/scripts/*.js', ['browserify']);
    });


    gulp.task('minifyJS', function () {
        return gulp.src(['client/scripts/*.js'])
            .pipe(changed('client/dist/js/'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('client/dist/js/'));
    });

    gulp.task('minifyCSS', function () {
        return gulp.src(['client/*/*.css'])
            .pipe(postcss(processors)).pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('client/dist/css/'));
    });


    gulp.task('images', function () {
        return gulp.src('./server/public/assets/raw/*.+(png|jpg|jpeg|gif|svg)').pipe(cache(imagemin())).pipe(gulp.dest('./server/public/assets/dist'));
    });
}());