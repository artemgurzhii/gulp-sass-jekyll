// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import webpack           from 'webpack-stream';
import browserSync       from 'browser-sync';
import gulp              from 'gulp';

// Dev
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'devlopment'; // NODE_ENV=production gulp

// Path
const jsMin = 'assets/js/min';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        $.plumber(),
        $.changed('.'),
        $.size(),
        $.if(isDevelopment, $.sourcemaps.init()),
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
          basename: "common",
          suffix: ".min",
          extname: ".js"
        }),
        $.duration('JS'),
        $.debug({
          title: 'Checking JavaScript:'
        }),
        $.if(isDevelopment, $.sourcemaps.write('.')),
      gulp.dest(jsMin)
    ).on('error', $.notify.onError());
    return combined;
  };
};
