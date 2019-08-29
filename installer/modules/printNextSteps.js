/**
 * Prints next steps.
 */

const chalk = require('chalk');

/* eslint-disable no-console */
module.exports = () => {
	console.log('\n\n✅ ', chalk.black.bgGreen(' All done! Use your code for good. \n'));
	console.log(
		'Installer has added HTML-Gulp-Boilerplate files to the current directory.  ',
		'\nInside this directory, you can run this command:'
	);

	// Scripts.
	console.log(
		'\n👉 ',
		' Type',
		chalk.black.bgWhite(' npm start '),
		'\n\n',
		'	Use to compile and run your files.',
		'\n',
		'	Watches for any changes and reports back any errors in your code.'
	);

	// Support.
	console.log('\n✊ ', chalk.black.bgYellow(' Support HTML-Gulp-Boilerplate \n'));
	console.log(
		'Message about HTML-Gulp-Boilerplate? You can now support this free and open source project i.e. more updates and better maintenance: \n'
	);

	// Get started.
	console.log('\n\n🎯 ', chalk.black.bgGreen(' Get Started → \n'));
	console.log(' I suggest that you begin by: \n');
	console.log(` ${chalk.dim('1.')} Editing the ${chalk.green('gulp.config.js')} file`);
	console.log(` ${chalk.dim('2.')} Running ${chalk.green('npm')} start`, '\n\n');
};