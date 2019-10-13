const { src, dest } = require('gulp')
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')

const config = require('../gulp.config')

/**
 * Custom Error Handler.
 */
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

// Optimize IMG files
module.exports = function images (done) {
  // Make sure this feature is activated before running
  if (!config.imgSet) return done()

  // Optimize IMG files
  return src(config.imgSRC)
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 3 }), // 0-7 low-high.
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )
    .pipe(dest(config.imgDST))
}
