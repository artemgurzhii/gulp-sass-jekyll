// Plugins
import cp                from 'child_process';

// Module
module.exports = options => {
  return done => {
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
  };
};
