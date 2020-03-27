var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function () {
	gulp.src('public/**/*.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('public/css-built'));

});

