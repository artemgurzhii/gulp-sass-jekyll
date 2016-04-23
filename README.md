Gulp-Sass-Jekyll
=============================

A starter project including full setup for Jekyll, Gulp, SASS, AutoPrefixer, BrowserSync, JS &amp; CSS minification and other.


## Use last JavaScript version in your gulpfile
This project build on Gulp 4. Node already supports a lot of **ES2015**, to avoid compatibility problem install Babel and rename your `gulpfile.js` as `gulpfile.babel.js`.

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

1. Clone this repo, or download it into a directory. `git clone https://github.com/artemgurzhii/Gulp-sass-jekyll`
2. Run `npm install`, inside the directory to install all dependencies.

## Usage

1. Run `jekyll serve --watch`
2. Run `gulp --watch`
3. In `gulpfile.babel.js` change assetsDir for your comfortable usage.
