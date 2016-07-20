// Plugins
import del from 'del';

// Module
module.exports = options => {
  return () => {
    return del(options.src);
  };
};
