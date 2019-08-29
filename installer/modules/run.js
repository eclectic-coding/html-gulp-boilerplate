const clearConsole = require('./clearConsole.js');

const fs = require('fs');
const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

module.exports = () => {
	// Init.
		clearConsole();
}