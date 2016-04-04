Gulp-Sass-Jade-Jekyll
=============================

A starter project including full setup for Jekyll, Jade, Gulp, SASS, AutoPrefixer, BrowserSync, JS &amp; CSS minification and other.

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [NodeJS](http://nodejs.org) - use the installer.
2. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp`

## Local Installation

1. Clone this repo, or download it into a directory. `git clone https://github.com/artemgurzhii/Gulp-Sass-Jade-Jekyll`
2. Run `npm install`, inside the directory to install all dependencies.

## Usage

1. Run `jekyll serve --watch`
2. Run `gulp --watch`
3. In `gulpfile.js` change assetsDir for your comfortable usage.

## Plugins List

1. CSS:

        sass, autoprefixer, csso, rename

2. JS:

        Babel(ES2015), jscpd, jshint, concat, uglify

3. IMG:

        imagemin, imageminPngquant

4. Other:

        browserSync, cp, jade, debug, plumber, changed
