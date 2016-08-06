// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import webpack           from 'webpack-stream';
import gulp              from 'gulp';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        webpack(),
        $.babel({
          presets: ['es2015'],
          compact: true
        }),
        $.uglify(),
        $.rename({
          basename: 'common',
          suffix: '.min',
          extname: '.js'
        }),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
    return combined;
  };
};
