var gulp = require('gulp');

// define plug-ins
var gulpFilter = require('gulp-filter');

// Define paths variables
var dest_path =  'static/assets';
var paths = {
  scripts: ['bower_components/bootstrap/dist/js/*.js', 'bower_components/bootstrap/dist/css/*.css', 
  'bower_components/jquery/dist/*.js', 'bower_components/typeahead.js/dist/typeahead.jquery*.js']
};

gulp.task('js', function() {
    var jsFilter = gulpFilter('*min.js');

    return gulp.src(paths.scripts)
    .pipe(jsFilter)
    .pipe(gulp.dest(dest_path + '/js/'));
});
gulp.task('css', function() {
	 var cssFilter = gulpFilter('*min.css');

    return gulp.src(paths.scripts)
    .pipe(cssFilter)
    .pipe(gulp.dest(dest_path + '/css/'));
});

gulp.task('default', ['js','css']);
