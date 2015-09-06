//gulp
var gulp = require('gulp');


// plugins
// var connect = require('gulp-connect');
var del         = require('del');
var sass        = require('gulp-ruby-sass');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');
var minifyCSS   = require('gulp-minify-css');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var concat      = require('gulp-concat');
var watch       = require('gulp-watch');




// tasks

//delete dist folder before updating
gulp.task('clean', function(){
	del('./dist');
});

//lint js scripts
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**', '!./app/js/bundled.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));
});

gulp.task('minify-css', ['sass'], function() {
  var opts = {comments:true,spare:true};
  // gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
  gulp.src('./app/styles/main.css')
	.pipe(minifyCSS(opts))
	.pipe(gulp.dest('./dist/styles/'))
});

gulp.task('sass', function () {
	return sass('./app/styles/sass')
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('./app/styles/'));
});


gulp.task('copy-bower-components', function () {
	gulp.src('./app/bower_components/**')
	.pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
  	gulp.src('./app/**/*.html')
	.pipe(gulp.dest('./dist/'));
});


// gulp.task('browserify', function() {
//   gulp.src(['app/js/app.js'])
//   .pipe(browserify({
//  insertGlobals: true,
//  debug: true
//   }))
//   .pipe(concat('bundled.js'))
//   .pipe(gulp.dest('./app/js'))
// });

gulp.task('browserify', function() {
	return browserify({ entries: ['app/js/app.js'] })
		.bundle()
		.pipe(source('bundled.js'))
		.pipe(gulp.dest('./app/js'));
});

gulp.task('browserifyDist', function() {
	return browserify({ entries: ['app/js/app.js'] })
		.bundle()
		.pipe(source('bundled.js'))
		// .pipe(uglify({
		// 	// inSourceMap:
		// 	// outSourceMap: "app.js.map"
		// }))
		.pipe(gulp.dest('./dist/js'));
});


// gulp.task('browserifyDist', function() {
//   gulp.src(['app/js/app.js'])
//   .pipe(browserify({
//  insertGlobals: true,
//  debug: true
//   }))
//   .pipe(concat('bundled.js'))
//   .pipe(uglify({
//    // inSourceMap:
//    // outSourceMap: "app.js.map"
//  }))
//   .pipe(gulp.dest('./dist/js'))
// });

gulp.task('watch', ['lint', 'browserify', 'sass'], function() {

	var watcher = gulp.watch(['app/js/app.js', 'app/js/controllers/*.js'], ['lint','browserify']);
	watcher.on('change', function (event) {
		console.log('Event type: ' + event.type); // added, changed, or deleted
		console.log('Event path: ' + event.path); // The path of the modified file
	});

	var sassWatcher = gulp.watch(['app/styles/sass/*.scss'],['sass']);
	sassWatcher.on('change', function (event){
		console.log('Event type: ' + event.type); // added, changed, or deleted
		console.log('Event path: ' + event.path); // The path of the modified file
	});

});




// default task
gulp.task('default',
  	['lint', 'browserify']
);
// build task
gulp.task('build',
  	['lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components']
);

