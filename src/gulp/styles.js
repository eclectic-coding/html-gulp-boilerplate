const { src, dest } = require('gulp')

// CSS related plugins
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const strip = require('gulp-strip-css-comments')

const filter = require('gulp-filter')
const header = require('gulp-header')
const lineec = require('gulp-line-ending-corrector')
const minify = require('gulp-uglifycss')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

const config = require('../gulp.config')
const site = require('../package.json')

/**
 * Template for banner to add to file headers
 */
const banner = {
  full:
    '/*!\n' +
    ' * <%= site.name %> v<%= site.version %>\n' +
    ' * <%= site.description %>\n' +
    ' * (c) ' +
    new Date().getFullYear() +
    ' <%= site.author.name %>\n' +
    ' * <%= site.license %> License\n' +
    ' */\n\n',
  min:
    '/*!' +
    ' <%= site.name %> v<%= site.version %>' +
    ' | (c) ' +
    new Date().getFullYear() +
    ' <%= site.author.name %>' +
    ' | <%= site.license %> License' +
    ' | <%= site.repository.url %>' +
    ' */\n'
}

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

/**
 * Task: `buildStyles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 */
module.exports = function buildStyles (done) {

  // Make sure this feature is activated before running
  if (!config.styleSet) return done()

  // Run tasks on SASS files
  return src(config.styleSRC, { allowEmpty: true })
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: config.styleErrLog,
        outputStyle: 'expanded',
        sourceComments: true
      })
    )
    .on('error', sass.logError)
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([autoprefixer(config.BROWSERS_LIST)]))
    .pipe(sourcemaps.write('.'))
    .pipe(lineec())
    .pipe(header(banner.full, { site: site }))
    .pipe(dest(config.styleDest))
    .pipe(filter('**/*.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify({ maxLineLen: 80 }))
    .pipe(strip({ preserve: false }))
    .pipe(header(banner.min, { site: site }))
    .pipe(lineec())
    .pipe(dest(config.styleDest))
}
