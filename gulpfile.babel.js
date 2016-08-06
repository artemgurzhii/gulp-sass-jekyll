import gulp from 'gulp';

// defining main paths for .sass/.js/.html etc files
const paths = {
  css:    'assets/css/main.sass',
  cssMin: 'assets/css/min',
  js:     'assets/js/common.js',
  jsMain: 'assets/js/modules/*.js',
  jsMin:  'assets/js/min',
  img:    'assets/img/*.*',
  imgMin: 'assets/img/min/',
  clean:  '_site',
  site:   '_site/index.html',
  md:     'README.md'
}

// write lazyRequireTask function to have all tasks in seperate files
// arguments - name of task, path to the task file, path to the folder, where task should be executed
let lazyRequireTask = (taskName, path, options = {}) => {
  options.taskName = taskName;
  path = `./gulp/${path}`;
  gulp.task(taskName, callback => {
    let task = require(path).call(this, options);
    return task(callback);
  });
};

// Requiring tasks on development stage(CSS,JS,IMG)
lazyRequireTask('assets:css', 'css', {
  src: paths.css,
  dest: paths.cssMin
});
lazyRequireTask('assets:js', 'js', {
  src: paths.js,
  dest: paths.jsMin
});
lazyRequireTask('assets:img', 'img', {
  src: paths.img,
  dest: paths.imgMin
});

// Requiring tasks on production stage(CSS,JS,IMG,DOCS,HTML)
lazyRequireTask('deploy:css', 'deploy/css', {
  src: paths.css,
  dest: paths.cssMin
});
lazyRequireTask('deploy:js', 'deploy/js', {
  src: paths.js,
  dest: paths.jsMin
});
lazyRequireTask('deploy:img', 'deploy/img', {
  src: paths.img,
  dest: paths.imgMin
});
lazyRequireTask('deploy:docs', 'deploy/docs', {
  src: [paths.md, paths.jsMain]
});
lazyRequireTask('deploy:html', 'deploy/html', {
  src: paths.site,
  dest: paths.clean
});

// Others tasks
// task to prevent caching(will remove _site folder where website is stored)
lazyRequireTask('clean', 'clean', {
  src: paths.clean
});
// Syncing and reloading browser
lazyRequireTask('browser:sync', 'sync');
lazyRequireTask('browser:build', 'build');

// defining tasks to run parallel
const browser = gulp.parallel('browser:sync', 'browser:build');
const assets  = gulp.parallel('assets:css', 'assets:js', 'assets:img');
const clean   = gulp.parallel('clean');
const build   = gulp.series(clean, gulp.parallel(browser, assets));
const deploy  = gulp.parallel('browser:sync', 'browser:build', 'deploy:css', 'deploy:js', 'deploy:img', 'deploy:html', 'deploy:docs');
export { build, clean, assets, browser, deploy };
export default build;
