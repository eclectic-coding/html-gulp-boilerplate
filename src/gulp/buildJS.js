const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const lineec = require('gulp-line-ending-corrector')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const remember = require('gulp-remember')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const config = require('../gulp.config')

const errorHandler = r => {
  const args = Array.prototype.slice.call(arguments)

  notify
    .onError({
      title: 'Task Failed [<%= error.message %>',
      message: 'See console.',
      sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    })
    .apply(this, args)

  gutil.beep() // Beep 'sosumi' again.

  // Prevent the 'watch' task from stopping.
  this.emit('end')
}

/**
 * Task: `vendorJS`.
 *
 * Concatenate and uglify custom JS scripts.
 */
module.exports = function vendorJS (jsSrc, jsOutput, jsSuffix) {

  return src(jsSrc) // Only run on changed files.
    .pipe(plumber(errorHandler))
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env', // Preset to compile your modern JS to ES5.
            {
              targets: {
                browsers: config.BROWSERS_LIST
              } // Target browser list to support.
            }
          ]
        ]
      })
    )
    .pipe(remember(jsSrc))
    .pipe(concat(jsSuffix + '.js'))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(dest(jsOutput))
    .pipe(
      rename({
        basename: jsSuffix,
        suffix: '.min'
      })
    )
    .pipe(uglify())
    .pipe(lineec())
    .pipe(dest(jsOutput))
}
