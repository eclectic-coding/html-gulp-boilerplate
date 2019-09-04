/**
 * Gulp Configuration File
 *
 * Edit the variables as per your project requirements.
 *
 * @package HTML-Gulp-Boilerplate
 */

const settings = {
  styleSet: true,
  styleRTLSet: false,
  jsVendorSet: false,
  jsCustomSet: false,
  imgSet: true,
}

module.exports = {
  // Project options.
  baseURL: './', // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.
  baseSRC: './src/',
  baseDest: './dist',
  reloadSet: true, // set browser sunc reload
  cleanSet: false,

  /***********************************************
   * Pick one style task ONLY!
   * Either Style or StyleRTL
   * Set StyleSET or StyleRTLSet to true or false
   ***********************************************/
  // Style options.
  styleSet: true, // set to false to disable task
  styleSRC: './src/scss/**/*.scss', // Path to main .scss file.
  styleDest: './dist/css', // Path to place the compiled CSS file. Default set to root folder.
  outputStyle: 'expanded', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
  errLogToConsole: true,

  // StyleRTL options -- For RTL stylesheet
  styleRTLSet: false, // set to false to disable task
  styleRTLSRC: './src/scss/main.scss', // Path to main .scss file.
  styleRTLDest: './dist/css', // Path to place the compiled CSS file. Default set to root folder.
  outputStyle: 'expanded', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
  errLogToConsole: true,

  // JS Vendor options.
  jsVendorSet: true, // set to false to disable task
  jsVendorSRC: './src/js/vendor/*.js',
  jsVendorDest: './dist/js/',
  jsVendorFile: 'vendor',

  // JS Custom options.
  jsCustomSet: true, // set to false to disable task
  jsCustomSRC: './src/js/*.js',
  jsCustomDest: './dist/js/',
  jsCustomFile: 'custom',

  // Images options.
  imgSet: true, // set to false to disable task
  imgSRC: './src/images/**/*', // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
  imgDST: './dist/images/', // Dest folder of optimized images. Must be different from the imagesSRC folder.

  // Watch files paths.
  watchStyles: './src/scss/**/*.scss', // Path to all *.scss files inside css folder and inside them.
  watchJsVendor: './src/js/vendor/*.js', // Path to all vendor JS files.
  watchJsCustom: './src/js/custom/*.js', // Path to all custom JS files.
  watchHTML: './*.html', // Path to all PHP files.

  // Browsers you care about for autoprefixing. Browserslist https://github.com/ai/browserslist
  // The following list is set as per WordPress requirements. Though, Feel free to change.
  BROWSERS_LIST: ['last 2 version', 'not dead', '> 0.2%', 'ie >= 11']
}
