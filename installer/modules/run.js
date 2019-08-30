/**
 * Install HTML-Gulp-Boilerplate
 */

const fs = require('fs')
const theCWD = process.cwd()
const theCWDArray = theCWD.split('/')
const theDir = theCWDArray[theCWDArray.length - 1]
const ora = require('ora')
const execa = require('execa')
const chalk = require('chalk')
const download = require('download')
const handleError = require('./handleError.js')
const clearConsole = require('./clearConsole.js')
const printNextSteps = require('./printNextSteps.js')

module.exports = () => {
  // Init.
  clearConsole()

  // Files.
  const filesToDownload = [
    'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/.editorconfig',
    'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/.eslintignore',
    'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/.eslintrc.js',
    'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp.config.js',
    'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulpfile.js'
  ]

  // Dotfiles (if any).
  const dotFiles = [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore'
  ]

  // Start.
  console.log('\n') // eslint-disable-line no-console
  console.log(
    '📦 ',
    chalk.black.bgYellow(
      ` Downloading WPGulp files in: → ${chalk.bgGreen(` ${theDir} `)}\n`
    ),
    chalk.dim(`\n In the directory: ${theCWD}\n`),
    chalk.dim('This might take a couple of minutes.\n')
  )

  const spinner = ora({ text: '' })
  spinner.start(
    `1. Creating WPGulp files inside → ${chalk.black.bgWhite(` ${theDir} `)}`
  )

  // Download.
  Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(
    async () => {
      dotFiles.map(x =>
        fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err =>
          handleError(err)
        )
      )
      spinner.succeed()

      // The npm install.
      spinner.start('2. Installing npm packages...')
      // await execa('npm', ['install', '--silent']);
      await execa('npm', [
        'install',
        'gulp',
        'gulp-cli',
        '@babel/core',
        '@babel/preset-env',
        '@babel/register',
        'beepbeep',
        'browser-sync',
        'browserslist',
        'eslint',
        'gulp',
        'gulp-autoprefixer',
        'gulp-babel',
        'gulp-cache',
        'gulp-concat',
        'gulp-filter',
        'gulp-imagemin',
        'gulp-line-ending-corrector',
        'gulp-notify',
        'gulp-plumber',
        'gulp-remember',
        'gulp-rename',
        'gulp-rtlcss',
        'gulp-sass',
        'gulp-sourcemaps',
        'gulp-uglify',
        'gulp-uglifycss'
      ])
      spinner.succeed()

      // Done.
      printNextSteps()
    }
  )
}
