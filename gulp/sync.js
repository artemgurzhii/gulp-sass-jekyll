// Plugins
const sync = require('browser-sync').create();
import gulp from 'gulp';

// Path
const paths = {
  css: {
    sassAll:  'assets/css/*/*/*.*',
    sassMain: 'assets/css/main.sass'
  },
  js: {
    jsModules: 'assets/js/modules/*.js',
    jsLibs:    'assets/js/libs/*.js',
    jsMain:    'assets/js/common.js'
  },
  html: {
    includes:    '_includes/*.html',
    subIncludes: '_includes/**/*.html',
    layouts:     '_layouts/*.html',
    site:        '_site',
    main:        '*.html',
    posts:       '_includes/posts/*.html'
  },
  markdown: {
    posts: '_posts/*.md'
  }
}

// Module
module.exports = options => {
  return () => {
    sync.init({
      server: {
        baseDir: paths.html.site
      },
      host: 'localhost',
      notify: false
    })
    sync.watch(paths.css.sassMain).on('change', gulp.series('assets:css', 'browser:build', sync.reload));
    sync.watch(paths.css.sassAll).on('change', gulp.series('assets:css', 'browser:build', sync.reload));
    sync.watch(paths.js.jsModules).on('change', gulp.series('assets:js', 'browser:build', sync.reload));
    sync.watch(paths.js.jsMain).on('change', gulp.series('assets:js', 'browser:build', sync.reload));
    sync.watch(paths.js.jsLibs).on('change', gulp.series('assets:js', 'browser:build', sync.reload));
    sync.watch(paths.html.includes).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.html.subIncludes).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.html.layouts).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.html.main).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.html.posts).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.markdown.posts).on('change', gulp.series('browser:build', sync.reload));
  };
};
