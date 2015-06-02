var gulp = require ('gulp'),
    gutil = require ('gulp-util'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass');

var  env,
        jsSources,
        sassSources,
        htmlSources,
        sassStyle,
        outputDir;


    env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
        outputDir = 'builds/development/';
        sassStyle = 'expanded';
    } else {
        outputDir = 'builds/production/';
        sassStyle = 'compressed';
    }

    jsSources = [
        'components/scripts/SCRIPTFILENAME.JS'
        //put all script files here to let concat combine them
    ];

    sassSources = ['components/sass/styles.scss'];
    htmlSources = [outputDir + '*.html'];


//run gulp js from the command line
gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        //combine all js files into the script.js file
        //this script.js file should be used as a destination
        //from the index.html file
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

//sass gulp

gulp.task('compass', function(){
    gulp.src(sassSources)
    //imbedded config.rb file for compass
    .pipe(compass({
        sass: 'components/sass',
        image: outputDir + 'images',
        style: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

//gulp html watch

gulp.task('html', function(){
    gulp.src(htmlSources)
    .pipe(connect.reload())
});

//gulp connect

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        livereload: true        //live reload server is on port 35729, dont need to do anything with that
    });         //go to http://localhost:8080 for testing
});

//gulp watch

gulp.task('watch', function(){
    gulp.watch(jsSources, ['js']);
    //sass works a bit differently
    //use *.scss to monitor all sass files instead of just style.scss
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
});

//default gulp task

gulp.task('default', ['js', 'compass', 'connect', 'watch']);