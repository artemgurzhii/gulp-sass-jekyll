// NODE_ENV=production gulp
import gulp             from 'gulp';
import rename           from 'gulp-rename';
import babel            from 'gulp-babel';
import sass             from 'gulp-sass';
import csso             from 'gulp-csso';
import prefix           from 'gulp-autoprefixer';
import cp               from 'child_process';
import imagemin         from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import browserSync      from 'browser-sync';
import jscpd            from 'gulp-jscpd';
import uglify           from 'gulp-uglify';
import concat           from 'gulp-concat';
import jshint           from 'gulp-jshint';
import plumber          from 'gulp-plumber';
import changed          from 'gulp-changed';
import rmvHtmlComnts    from 'gulp-remove-html-comments';
import debug            from 'gulp-debug';
import sourcemaps       from 'gulp-sourcemaps';
import gulpIf           from 'gulp-if';
import del              from 'del';
import notify           from 'gulp-notify';
import combiner         from 'stream-combiner2';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'devlopment';
const paths = {
  // css
  css: {
    sass:       'assets/css/main.sass',
    sassAll:    'assets/css/*/*.*',
    css:        'assets/css/*.css',
    cssAll:     'assets/css/*.*',
    cssMin:     'assets/css/min/'
  },

  // js
  js: {
    jsAll:  'assets/js/*.*',
    jsMain: 'assets/js/*.js',
    jsMin:  'assets/js/min/common.min.js'
  },

  //images
  img: {
    imagesAll: 'assets/img/*.*',
    imagesMin: 'assets/img/min/'
  },

  // html
  html: {
    includes: '_includes/*.html',
    site:     '_site',
    main:     '*.html',
    include:  '_includes/'
  }
}

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> jekyll build'
};

// task jekyll-build
gulp.task('jekyll-build', (done) => {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// task jekyll-rebuild
gulp.task('jekyll-rebuild', ['jekyll-build'], () => browserSync.reload());

// task browser-sync
gulp.task('browser-sync', ['jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: paths.html.site
    },
    host: "localhost",
    notify: false
  });
});

// task css
gulp.task('css', () => {
  return combiner(
    gulp.src(paths.css.sass),
      gulpIf(isDevelopment, sourcemaps.init()),
      sass({
        includePaths: ['css'],
        onError: browserSync.notify
      }),
      prefix(['last 35 versions', '> 1%', 'ie 8', 'ie 7', 'ie 6'], { cascade: true }),
      csso(),
      rename({suffix: '.min'}),
      debug({title: 'Checking:'}),
      gulpIf(isDevelopment, sourcemaps.write('.')),
      gulp.dest(paths.css.cssMin)
  ).on('error', notify.onError());
});

// task html
gulp.task('html', () => {
  return combiner(
    gulp.src(paths.html.includes),
      rmvHtmlComnts(),
      gulp.dest('')
    ).on('error', notify.onError());
});

// task image
gulp.task('image', () => {
  return combiner(
    gulp.src(paths.img.imagesAll),
      imageminPngquant({quality: '65-80', speed: 4})(),
      debug({title: 'Checking:'}),
      gulp.dest(paths.img.imagesMin)
    ).on('error', notify.onError());
});


// this part response for all stuff with js
gulp.task('js', () => {
  return combiner(
    gulp.src(paths.js.jsMain),
      babel({
        presets: ['es2015']
      }),
      jscpd({
        'min-lines': 1,
        verbose    : true
      }),
      jshint(),
      jshint.reporter('default'),
      concat(paths.js.jsMin),
      changed(paths.js.jsAll),
      uglify(),
      debug({title: 'Checking:'}),
      gulp.dest('')
  ).on('error', notify.onError());
});

// watch changes and run tasks
gulp.task('watch', () => {
  gulp.watch(paths.css.sassAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.css.cssAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.js.jsAll, ['js', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.html.includes, ['jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.html.main, ['jekyll-build', 'jekyll-rebuild']);
});

gulp.task('clean', () => {
  return del('_site');
});

// Prevent pipe breaking caused by errors from gulp plugins
gulp.task('plumber', () => {
  return gulp.src(['css', 'js', 'html'], {read: false})
    .pipe(plumber({
      errorHandler: notify.onError((err) => {
        return {
          title: 'Styles',
          message: err.message
        };
      })
    }))
    .pipe(debug({title: 'Checking:'}));
});

// task default
gulp.task('default', () => {
  gulp.start('clean', 'image', 'plumber', 'browser-sync', 'watch', 'css', 'js', 'jekyll-build', 'jekyll-rebuild');
});
