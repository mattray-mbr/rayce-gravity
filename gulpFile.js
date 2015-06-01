var gulp = require ('gulp'),
    gutil = require ('gulp-util'),
    concat = require('gulp-concat'),
    coffee = require ('gulp-coffee'),
    compass = require('gulp-compass');

    var jsSources = [
        'components/scripts/SCRIPTFILENAME.JS'
        //put all script files here to let concat combine them
    ];

    var sassSources = ['components/sass/styles.scss'];

gulp.task ('coffee', function (){
    gulp.src('components/coffee/tagline/coffee')
        .pipe(coffee({bare:true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

//run gulp js from the command line
gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        //combine all js files into the script.js file
        //this script.js file should be used as a destination
        //from the index.html file
        .pipe(gulp.dest('builds/development/js'))
});

//sass gulp

gulp.task('compass', function(){
    gulp.src(sassSources)
    //imbedded config.rb file for compass
    .pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css'))
});