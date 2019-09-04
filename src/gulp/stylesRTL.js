const { src, dest } = require('gulp')
const filter = require('gulp-filter')
const header = require('gulp-header')
const lineec = require('gulp-line-ending-corrector')
const minify = require('gulp-uglifycss')
const notify = require('gulp-notify')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const rtlcss = require('gulp-rtlcss') // Generates RTL stylesheet.
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
 * Task: `stylesRTL`.
 *
 * Compiles Sass, Autoprefixes it, Generates RTL stylesheet, and Minifies CSS.
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix -rtl and generates style-rtl.css
 *    6. Writes Sourcemaps for style-rtl.css
 *    7. Renames the CSS files with suffix .min.css
 *    8. Minifies the CSS file and generates style-rtl.min.css
 *    9. Injects CSS or reloads the browser via browserSync
 */
module.exports = function(done) {
  // Make sure this feature is activated before running
  if (!config.styleRTLSet) return done()

  return src(config.styleRTLSRC, {
    allowEmpty: true
  })
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
    .pipe(
      sourcemaps.write({
        includeContent: false
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(prefix(config.BROWSERS_LIST))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(header(banner.full, { site: site }))
    .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
    .pipe(rtlcss()) // Convert to RTL.
    .pipe(sourcemaps.write('./')) // Output sourcemap for style-rtl.css.
    .pipe(dest(config.styleRTLDest))
    .pipe(filter('**/*.css')) // Filtering stream to only css files.
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify({ maxLineLen: 10 }))
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(dest(config.styleRTLDest))
    .pipe(filter('**/*.css')) // Filtering stream to only css files.
    .pipe(
      notify({
        message: '\n\n ✅  ===> STYLES RTL — completed!\n',
        onLast: true
      })
    )
}
