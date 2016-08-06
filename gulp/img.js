// Plugins
const $ = require('gulp-load-plugins')();
import imageminPngquant  from 'imagemin-pngquant';
import {obj as combiner} from 'stream-combiner2';
import gulp              from 'gulp';

// Module
module.exports = options => {
  return () => {
    return combiner(
      gulp.src(options.src),
        $.changed(imagesMin),
        $.size(),
        $.imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [imageminPngquant()]
        }),
        $.duration('IMG'),
        $.debug({
          title: 'Checking Images:'
        }),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};
