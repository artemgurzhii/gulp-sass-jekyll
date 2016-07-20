// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import pxtorem           from 'postcss-pxtorem';
import zindex            from 'postcss-zindex';
import focus             from 'postcss-focus';
import browserSync       from 'browser-sync';
import cssMqpacker       from 'css-mqpacker';
import gulp              from 'gulp';

// Dev
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'devlopment'; // NODE_ENV=production gulp

// Path
const cssMin = 'assets/css/min';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        $.plumber(),
        $.changed('.'),
        $.size(),
        $.if(isDevelopment, $.sourcemaps.init()),
        $.sass({
          includePaths: ['assets/css/'],
          onError: browserSync.notify
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
        $.if(isDevelopment, $.sourcemaps.write('.')),
      gulp.dest(cssMin)
    ).on('error', $.notify.onError());
  };
};
