// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import gulp from 'gulp';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        $.htmlmin({
          collapseWhitespace: true
        }),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};
