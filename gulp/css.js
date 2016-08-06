// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import pxtorem           from 'postcss-pxtorem';
import zindex            from 'postcss-zindex';
import focus             from 'postcss-focus';
import cssMqpacker       from 'css-mqpacker';
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
        $.sass({
          includePaths: ['assets/css/']
        }),
        $.postcss([ zindex, pxtorem, focus, cssMqpacker ]),
        $.autoprefixer({
          browsers: ['> 1%'],
          cascade: false
        }),
        $.rename({
          suffix: '.min'
        }),
        $.duration('CSS'),
        $.debug({
          title: 'Checking CSS:'
        }),
        $.sourcemaps.write('.'),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};
