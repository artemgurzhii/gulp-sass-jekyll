Gulp-Sass-Jekyll
=============================

A starter project including full setup for Jekyll, Gulp, SASS, AutoPrefixer, BrowserSync, JS &amp; CSS minification and other.


## Use last JavaScript version in your gulpfile
This project is build on Gulp 4. Node already supports a lot of **ES2015**, to avoid compatibility problem install Babel and rename your `gulpfile.js` as `gulpfile.babel.js`.

```
npm install --save-dev babel-register babel-preset-es2015
```

Then create a **.babelrc** file with the preset configuration.

```
{
  "presets": [ "es2015" ]
}
```

**.babelrc** file is already in root folder

Here you can find latest documentation for
[Gulp 4](https://github.com/gulpjs/gulp/tree/4.0)

## System Preparation

To use this starter project, you'll need following installed on your machine.

1. [NodeJS](http://nodejs.org) - use the installer.
2. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp`

## Local Installation

1. Clone this repo, or download it into a directory. `git clone https://github.com/artemgurzhii/gulp-sass-jekyll`
2. Run `npm install`, inside the directory to install all dependencies.

## Usage

1. Run `jekyll serve --watch`
2. Run `gulp --watch`
3. In `gulpfile.babel.js` change 'paths' variable for your comfortable usage.


## Project Structure
1. assets
 - css
     * 1-tools
     * 2-modules
     * 3-min
     * main.sass
 - img
     * min
 - js
     * libs
     * min
     * modules


## List of all plugins
1. Main
 - gulp - The streaming build system
 - gulp-postcss - Pipe CSS through PostCSS processors with a single parse
2. js
 - babel - JS compiler from ES6 to ES5
 - webpack - A bundler for javascript. Packs many modules into a few bundled assets
 - jshint - is a tool that helps to detect errors and potential problems in your JavaScript code
 - jshint-stylish - Stylish reporter for JSHint
 - jscpd - JS Copy/paste detector for programming source code
 - gulp-uglify - JS minifier
3. css
 - gulp-sass - SASS plugin for gulp
 - gulp-sourcemaps - Source map support for Gulp.js
 - gulp-autoprefixer - Prefix CSS
 - gulp-csso - CSS minifier
 - css-mqpacker - A tool for packing same CSS media query rules into one with PostCSS
 - postcss-focus -  A plugin to add :focus selector to every :hover for keyboard accessibility
 - postcss-pxtorem - Convert pixel units to rem (root em) units using PostCSS
 - postcss-zindex - Reduce z-index values with PostCSS
4. html
 - gulp-htmlmin - HTML minifier
5. images
 - imagemin-pngquant - Pngquant plugin for imagemin
 - gulp-imagemin - Minify PNG, JPEG, GIF and SVG images
6. Testing and documentation
 - gulp-jsdoc3 - Gulp integration for jsdoc3 cli
 - mocha - JS test framework for node.js and the browser
 - chai - BDD / TDD assertion framework for node.js and the browser
 - mocha-phantomjs - Run client-side mocha tests in the command line through phantomjs
 - ink-docstrap - A template for JSDoc3 based on Bootstrap and themed by Bootswatch
7. other
 - gulp-load-plugins - Automatically load in gulp plugins
 - gulp-rename - Rename files
 - gulp-size - Display the size of your project
 - gulp-duration - Track the duration of parts of your gulp tasks
 - gulp-if - Conditionally run a task
 - gulp-plumber - Fixing Node pipes
 - gulp-notify - Send messages based on Vinyl Files or Errors
 - gulp-changed - Will pass only through changed files
 - gulp-debug - Debug vinyl file streams to see what files are run through your gulp pipeline
 - stream-combiner2 - Turn a pipeline into a single stream
 - webpack-stream - Run webpack through a stream interface
 - browser-sync - Keep multiple browsers & devices in sync when building websites
 - del - Delete files and folders
