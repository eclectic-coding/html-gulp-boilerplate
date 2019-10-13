/**
 * Gulp Configuration File
 *
 * Edit the variables as per your project requirements.
 */

module.exports = {
  /**
   * Set the modules you wish to run.
   * All modules are compiles and moved tp the Destination folder
   * Set you links to the destination folder (i.e. 'dist/css/main.min.css')
   */
  styleSet: true,
  jsVendorSet: true,
  jsCustomSet: true,
  imgSet: true,
  reloadSet: true,
  cleanSet: false,

  // Project options.
  baseURL: './', // URL -- Leave it like it is, since our gulpfile.js lives in the root folder.
  baseSRC: './src/',
  baseDest: './dist',

  // Set global destination folders here
  styleDest: 'dist/css',
  jsDest: 'dist/js/',

  // Style options.
  styleSRC: 'src/scss/*.scss', // Path to main .scss file.
  styleOutput: 'expanded', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
  styleErrLog: true,

  /**
   * JS Section
   * Vendor files: JQuery, modernizer, etc.
   * Custom files: you custom JS code
   */

  // JS Vendor options.
  jsVendorSRC: 'src/js/vendor/*.js',
  jsVendorFile: 'vendor',

  // JS Custom options.
  jsCustomSRC: 'src/js/*.js',
  jsCustomFile: 'custom',

  // Images options.
  imgSRC: './src/img/**/*', // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
  imgDST: './dist/images/', // Dest folder of optimized images. Must be different from the imagesSRC folder.

  // Watch files paths.
  watchStyles: './src/scss/**/*.scss', // Path to all *.scss files inside css folder and inside them.
  watchJsVendor: './src/js/vendor/*.js', // Path to all vendor JS files.
  watchJsCustom: './src/js/custom/*.js', // Path to all custom JS files.
  watchHTML: './*.html', // Path to all HTML files.

  // Browsers you care about for autoprefixing. Browserslist https://github.com/ai/browserslist
  // The following list is set as per WordPress requirements. Though, feel free to change.
  BROWSERS_LIST: ['last 2 version', 'not dead', '> 0.2%', 'ie >= 11']
}
