var gulp             = require('gulp'),
// rename css files after minification
    rename           = require("gulp-rename"),
// gulp sass
    sass             = require("gulp-sass"),
// minifying css files
    csso             = require('gulp-csso'),
// css autoprefixer
    prefix           = require('gulp-autoprefixer'),
// child_process
    cp               = require('child_process'),
// gulp jade
    jade             = require('gulp-jade'),
// images minification
    imagemin         = require('imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
// browser synchronization
    browserSync      = require('browser-sync'),
// searching for duplicating js files
    jscpd            = require('gulp-jscpd'),
// minifying js files
    uglify           = require('gulp-uglify'),
// concatenate js files
    concat           = require('gulp-concat'),
// jshint
    jshint           = require('gulp-jshint'),
// prevent pipe breaking
    plumber          = require('gulp-plumber'),
// track only changed files
    changed          = require('gulp-changed'),
//  gulp debug in terminal
    debug            = require('gulp-debug');

// here is all assets directories
var assetsDir = {
  // css
  cssAll:  'assets/css/*.*',
  css:     'assets/css/*.css',
  sassAll: 'assets/css/*/*.sass',
  sass:    'assets/css/main.sass',
  cssMin:  'assets/css/min/',

  // js
  jsAll:  'assets/js/*.*',
  jsMain: 'assets/js/*.js',
  jsMin:  'assets/js/min/common.min.js',

  //images
  imagesAll: 'assets/img/*.*',
  imagesMin: 'assets/img/min/',

  // html & jade
  jadeAll:  '_jadefiles/*.jade',
  includes: '_includes/',
  site:     '_site'
}

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> jekyll build'
};

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: assetsDir.site
    },
    host: "localhost",
    // if you don't want to see notifications change true to false
    notify: true
  });
});

// this part response for sass converting in css
// and minification, autoprefixer, renaming
gulp.task('css', function() {
  return gulp.src(assetsDir.sass)
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(assetsDir.cssMin));
});

// this part response for converting jade in html
gulp.task('jade', function(){
  return gulp.src(assetsDir.jadeAll)
    .pipe(jade())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(assetsDir.includes));
});

// this part response for image minification
gulp.task('image', function () {
  return gulp.src(assetsDir.imagesAll)
    .pipe(imageminPngquant({quality: '65-80', speed: 4})())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(assetsDir.imagesMin));
});

// this part response for all stuff with js
gulp.task('js', function() {
  return gulp.src(assetsDir.jsMain)
    .pipe(jscpd({
      'min-lines': 1,
      verbose    : true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(assetsDir.jsMin))
    .pipe(changed(assetsDir.jsAll))
    .pipe(uglify())
    .pipe(gulp.dest(''))
    .pipe(debug({title: 'Checking:'}))
});

// watch changes and run tasks
gulp.task('watch', function () {
  gulp.watch(assetsDir.sassAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.jsAll, ['js', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.jadeAll, ['jade', 'jekyll-build', 'jekyll-rebuild']);
});

// Prevent pipe breaking caused by errors from gulp plugins
gulp.task('plumber', function() {
  return gulp.src(['css'], {read: false})
    .pipe(plumber())
    .pipe(debug({title: 'Checking:'}));
});

// default task
gulp.task('default', function() {
  gulp.start('image', 'plumber', 'browser-sync', 'watch', 'jade', 'css', 'js', 'jekyll-build', 'jekyll-rebuild');
});
