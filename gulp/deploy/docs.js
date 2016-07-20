// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import config from '../../jsdoc.json';
import gulp from 'gulp';

// Module
module.exports = options => {
  return cb => {
    return combiner(
      gulp.src(options.src),
        $.jsdoc3(config, cb)
    ).on('error', $.notify.onError());
  };
};
