/**
 * Install HTML-Gulp-Boilerplate
 */

const fs = require('fs')
const theCWD = process.cwd()
const theCWDArray = theCWD.split('/')
const theDir = theCWDArray[theCWDArray.length - 1]
// const ora = require('ora')
// const execa = require('execa')
const chalk = require('chalk')
const download = require('download')
// const handleError = require('./handleError.js')
const clearConsole = require('./clearConsole.js')
const printNextSteps = require('./printNextSteps.js')

module.exports = () => {
	// Init.
	clearConsole()

	console.log(theCWD)

	// Files.
	const filesToDownload = [
		'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp/customJS.js',
		'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp/images.js',
		'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp/styles.js',
		'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp/stylesRTL.js',
		'https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp/vendorJS.js'
	]

	// Start.
	console.log('\n') // eslint-disable-line no-console
	console.log(
		'📦 ',
		chalk.black.bgYellow(
			` Downloading HTML-Gulp-Boilerplate files in: → ${chalk.bgGreen(` ${theDir} `)}\n`
		),
		chalk.dim(`\n In the directory: ${theCWD}\n`),
		chalk.dim('This might take a couple of minutes.\n')
	)

	// const spinner = ora({text: ''})
	// spinner.start(
	// 	`1. Creating HTML-Gulp-Boilerplate files inside: → ${chalk.black.bgWhite(` ${theDir} `)}`
	// )

	console.log(`1. Creating HTML-Gulp-Boilerplate files inside: → ${chalk.black.bgWhite(` ${theDir}`)}`)


	fs.mkdir('../../gulp', {recursive: true}, (err) => {
		if (err) throw err;
	});

	console.log('Created GULP directory')
	console.log(`${theCWD}`)

	download('https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulp.config.js')
		.pipe(fs.createWriteStream('gulp.config.js'));
	download('https://raw.githubusercontent.com/eclectic-coding/html-gulp-boilerplate/master/src/gulpfile.js')
		.pipe(fs.createWriteStream('gulpfile.js'));

	console.log('Added gulp files')

	// Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(
	// 	async () => {
	// 		spinner.succeed()
	//
	// 		// The npm install.
	// 		spinner.start('2. Installing npm packages...')
	// 		await execa('npm', [
	// 			'install',
	// 			'gulp',
	// 			'gulp-cli',
	// 			'@babel/core',
	// 			'@babel/preset-env',
	// 			'@babel/register',
	// 			'beepbeep',
	// 			'browser-sync',
	// 			'browserslist',
	// 			'eslint',
	// 			'gulp',
	// 			'gulp-autoprefixer',
	// 			'gulp-babel',
	// 			'gulp-cache',
	// 			'gulp-concat',
	// 			'gulp-filter',
	// 			'gulp-imagemin',
	// 			'gulp-line-ending-corrector',
	// 			'gulp-notify',
	// 			'gulp-plumber',
	// 			'gulp-remember',
	// 			'gulp-rename',
	// 			'gulp-rtlcss',
	// 			'gulp-sass',
	// 			'gulp-sourcemaps',
	// 			'gulp-uglify',
	// 			'gulp-uglifycss'
	// 		])
	// 		spinner.succeed()
	// 		// TODO: MERGE PACKAGE.JSON to add scripts to project.
	// 		// TODO: Migrate scripts to post-install in package.json
	// 		// Done.
	// 		printNextSteps()
	// 	}
	// )
}
