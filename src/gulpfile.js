/**
 * Gulp project
 *
 * Gulp Boilerplate for HTML5 projects
 */

// Load Plugins.
const { watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

// File imports
const config = require('./gulp.config.js')
const buildStyles = require('./gulp/styles')
const buildJS = require('./gulp/buildJS')
const images = require('./gulp/images')

/**
 * Helpers
 */
function vendorJS (done) {
  if (!config.jsVendorSet) return done()
  return buildJS(config.jsVendorSRC, config.jsDest, config.jsVendorFile)
}

function customJS (done) {
  if (!config.jsCustomSet) return done()
  return buildJS(config.jsCustomSRC, config.jsDest, config.jsCustomFile)
}

/**
 * Setup BrowserSync Server
 *
 *********************************************/
const startServer = function (done) {
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
const reloadBrowser = function (done) {
  if (!config.reloadSet) return done()
  browserSync.reload()
  done()
}

// Watch for changes
const watchSource = function (done) {
  watch(config.baseURL, series(exports.default, reloadBrowser))
  watch(config.baseSRC, series(exports.default, reloadBrowser))
  watch('./*.html', reloadBrowser)
  done()
}

// Remove pre-existing content from output folders
const cleanDist = function (done) {
  if (!config.cleanSet) return done()
  del.sync([config.baseDest])
  return done()
}

// Default task
exports.default = series(
  cleanDist,
  buildStyles,
  parallel(vendorJS, customJS, images)
)

// Watch and reload
exports.watch = series(exports.default, startServer, watchSource)

