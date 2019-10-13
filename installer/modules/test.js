const fs = require('fs')
const theCWD = process.cwd()
const theCWDArray = theCWD.split('/')
const theDir = theCWDArray[theCWDArray.length - 1]
const mergePackageJson = require('merge-package.json')


mergePackageJson('')
