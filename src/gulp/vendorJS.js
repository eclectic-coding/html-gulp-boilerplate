const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const lineec = require('gulp-line-ending-corrector')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const remember = require('gulp-remember')
const rename = require('gulp-rename')
const uglify = require('gulp-uglifycss')
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
 * 	1. Gets the source folder for JS custom files
 * 	2. Concatenates all the files and generates custom.js
 *	3. Renames the JS file with suffix .min.js
 *	4. Uglifes/Minifies the JS file and generates custom.min.js
 */
module.exports = function(done) {
  // Make sure this feature is activated before running
  if (!config.jsVendorSet) return done()

  return src(config.jsVendorSRC) // Only run on changed files.
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
    .pipe(remember(config.jsVendorSRC)) // Bring all files back to stream.
    .pipe(concat(config.jsVendorFile + '.js'))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(dest(config.jsVendorDest))
    .pipe(
      rename({
        basename: config.jsVendorFile,
        suffix: '.min'
      })
    )
    .pipe(uglify())
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(dest(config.jsVendorDest))
    .pipe(
      notify({
        message: '\n\n ✅  ===> VENDOR JS — completed!\n',
        onLast: true
      })
    )
}
