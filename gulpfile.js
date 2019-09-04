/**
 * Gulpfile.
 *
 * Gulp Boilerplate for HTML5.
 *
 */

// Load HTML-Gulp-Boilerplate Configuration.
const config = require('./gulp.config.js')

// Gulp Packages -- General
const { watch, series, parallel } = require('gulp')

// Utilities
const browserSync = require('browser-sync').create()
const del = require('del')

// Import modules
const customJS = require('./gulp/customJS')
const vendorJS = require('./gulp/vendorJS')
const buildStyles = require('./gulp/styles')
const buildStylesRTL = require('./gulp/stylesRTL')
const buildIMGs = require('./gulp/images')

// Gulp Tasks ---------------------------------------=>

// Watch for changes to the src directory
const startServer = function(done) {
  if (!config.reloadSet) return done()

  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: config.baseURL
    }
  })

  // Signal completion
  done()
}

// Reload the browser when files change
const reloadBrowser = function(done) {
  if (!config.reloadSet) return done()
  browserSync.reload()
  done()
}

// Watch for changes
const watchSource = function(done) {
  watch(config.baseURL, series(exports.default, reloadBrowser))
  watch(config.baseSRC, series(exports.default, reloadBrowser))
  watch('./*.html', reloadBrowser)
  done()
}

// Remove pre-existing content from output folders
const cleanDist = function(done) {
  if (!config.cleanSet) return done()
  del.sync([config.baseDest])
  return done()
}

// Default task
exports.default = series(
  cleanDist,
  parallel(buildStyles, buildStylesRTL, buildIMGs, customJS, vendorJS)
)

// Watch and reload
exports.watch = series(exports.default, startServer, watchSource)

