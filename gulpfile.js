var elixir = require('laravel-elixir'),
livereload = require('gulp-livereload'),
gulp = require('gulp'),
clean = require('rimraf');

var config = {
	assets_path: './resources/assets',
	build_path:'./public/build'
};

config.bower_path = './resources/bower_components';

config.build_path_js = config.build_path + "/js";
config.build_vendor_path_js = config.build_path_js + "/vendor";

config.vendor_path_js = [
	config.bower_path + '/jquery/dist/jquery.min.js',
	config.bower_path + '/bootstrap/dist/js/bootstrap.min.js',
	config.bower_path + '/angular/angular.min.js',
	config.bower_path + '/angular-route/angular-route.min.js',
	config.bower_path + '/angular-resource/angular-resource.min.js',
	config.bower_path + '/angular-animate/angular-animate.min.js',
	config.bower_path + '/angular-messages/angular-messages.min.js',
	config.bower_path + '/angular-bootstrap/ui-bootstrap.min.js',
	config.bower_path + '/angular-strap/dist/modules/navbar.min.js'
];

config.build_path_css = config.build_path + "/css";
config.build_vendor_path_css = config.build_path_css + "/vendor";

config.vendor_path_css = [
	config.bower_path + '/bootstrap/dist/css/bootstrap.min.css',
	config.bower_path + '/bootstrap/dist/css/bootstrap-theme.min.css'
];

// TASKS

gulp.task('copy-styles',function(){
	gulp.src([
		config.assets_path + '/css/**/*.css'
	])
	.pipe(gulp.dest(config.build_path_css))
	.pipe(livereload());
	
	gulp.src(config.vendor_path_css)
	.pipe(gulp.dest(config.build_vendor_path_css))
	.pipe(livereload());
});

gulp.task('copy-scripts',function(){
	gulp.src([
		config.assets_path + '/js/**/*.js'
	])
	.pipe(gulp.dest(config.build_path_js))
	.pipe(livereload());
	
	gulp.src(config.vendor_path_js)
	.pipe(gulp.dest(config.build_vendor_path_js))
	.pipe(livereload());
});

gulp.task('clear-build-folder',function(){
	clean.sync(config.build_path);
});

gulp.task('default',['clear-build-folder'],function(){
	elixir(function(mix){
		mix.styles(config.vendor_path_css.concat([config.assets_path+'/css/**/*']),
		'public/css/all.css',config.assets_path);
		mix.scripts(config.vendor_path_js.concat([config.assets_path+'/js/**/*']),
		'public/js/all.js',config.assets_path);
		mix.version(['js/all.js','css/all.css']);
	});
});

gulp.task('watch-dev',['clear-build-folder'], function(){
	livereload.listen();
	gulp.start('copy-styles','copy-scripts');
	gulp.watch(config.assets_path + '/**',['copy-styles','copy-scripts']); // vê em todos os arquivos
});


