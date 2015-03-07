/* eslint-disable no-console, no-process-env */
var gulp      = require('gulp');
var clean     = require('rimraf');
var iff       = require('gulp-if');
var rename    = require('gulp-rename');
var accord    = require('gulp-accord');
var webpack   = require('webpack');
var gwebpack  = require('gulp-webpack');
var watch     = require('gulp-watch');
var webserver = require('gulp-webserver');
var nib       = require('nib');
var watching  = false;

var env = process.env.ENV || 'production';
var development = env === 'development';
console.info('Environment: ' + env);

gulp.task('default', ['build']);

gulp.task('build', [
	'build:assets',
	'build:styles',
	'build:scripts'
]);

gulp.task('build:assets', function() {
	gulp.src('src/assets/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('build:styles', function() {
	gulp.src('src/styles/index.styl')
		.pipe(accord('stylus', {
			include: 'src/styles',
			use: nib()
		}))
		.pipe(iff(!development, accord('csso')))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build:scripts', function() {
	var options = {
		watch: watching,
		watchDelay: 50,
		devtool: development? 'inline-source-map' : null,
		resolve: { extensions: ['', '.js'] },
		module: { loaders: [
			{ test: /\.jsx?$/,
			  exclude: /node_modules/,
			  loader: 'babel-loader?experimental&playground&loose' },
		]},
		externals: {
			'psd': 'PSD'
		},
		output: {
			pathinfo: !!development,
			filename: 'scripts.js'
		},
		plugins: development? [] : [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin(),
		]
	};
	gulp.src('src/index.js')
		.pipe(gwebpack(options, webpack))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	var tasks = {
		'build:assets': 'src/assets/**/*',
		'build:styles': 'src/styles/**/*',
	};
	watching = true;
	for (var task in tasks) {
		/* eslint-disable no-loop-func, no-shadow */
		(function(task, sources) {
			watch(sources, function() {
				gulp.start(task);
			});
		})(task, tasks[task]);
		/* eslint-enable no-loop-func, no-shadow */
	}
	gulp.start('build');
});

gulp.task('serve', ['watch'], function() {
	var options = {
		livereload: true,
		host: '0.0.0.0',
		port: 8080
	};
	gulp.src('dist')
		.pipe(webserver(options));
});

gulp.task('clean', function(done) {
	clean('dist', done);
});
