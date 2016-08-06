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
        $.plumber(),
        $.changed('.'),
        $.size(),
        $.sourcemaps.init(),
        webpack(),
        $.jshint({
          esversion: 6
        }),
        $.jshint.reporter('jshint-stylish'),
        $.babel({
          presets: ['es2015'],
          compact: true
        }),
        $.jscpd(),
        $.rename({
          basename: 'common',
          suffix: '.min',
          extname: '.js'
        }),
        $.duration('JS'),
        $.debug({
          title: 'Checking JavaScript:'
        }),
        $.sourcemaps.write('.'),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
    return combined;
  };
};
