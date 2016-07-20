// Plugins
const $ = require('gulp-load-plugins')();
import imageminPngquant  from 'imagemin-pngquant';
import {obj as combiner} from 'stream-combiner2';
import gulp              from 'gulp';

// Path
const imagesMin = 'assets/img/min/';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        $.imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [imageminPngquant({
            quality: '100',
            speed: 1
          })]
        }),
      gulp.dest(imagesMin)
    ).on('error', $.notify.onError());
  };
};
