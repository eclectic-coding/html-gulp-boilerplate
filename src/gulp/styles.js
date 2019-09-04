const { src, dest } = require('gulp')
const browserSync = require('browser-sync')
const filter = require('gulp-filter')
const header = require('gulp-header')
const lineec = require('gulp-line-ending-corrector')
const minify = require('gulp-uglifycss')
const notify = require('gulp-notify')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

const config = require('../gulp.config')
const site = require('../../package.json')

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
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates CSS
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 */
module.exports = function(done) {
  // Make sure this feature is activated before running
  if (!config.styleSet) return done()

  // Run tasks on all Sass files
  return (
    src(config.styleSRC)
      .pipe(plumber(errorHandler))
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          errLogToConsole: config.errLogToConsole,
          outputStyle: config.outputStyle,
          sourceComments: true
        })
      )
      .on('error', sass.logError)
      .pipe(sourcemaps.write({ includeContent: false }))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(prefix(config.BROWSERS_LIST))
      .pipe(sourcemaps.write('./'))
      .pipe(lineec())
      .pipe(header(banner.full, { site: site }))
      .pipe(dest(config.styleDest))
      .pipe(filter(config.styleDest + '*.css')) // Filtering stream to only css files.
      .pipe(browserSync.stream()) // Reloads style.css.
      .pipe(rename({ suffix: '.min' }))
      .pipe(minify({ maxLineLen: 10 }))
      .pipe(lineec())
      // TODO work on better header insert
      // .pipe(header(banner.min, { site: site }))
      .pipe(dest(config.styleDest))
      .pipe(
        notify({ message: '\n\n✅  ===> STYLES — completed!\n', onLast: true })
      )
  )
}
