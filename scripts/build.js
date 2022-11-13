'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const paths = require('../config/paths');
const printBuildError = require('react-dev-utils/printBuildError');

// @cep-begin
const cep = require('./cep.js');
// @cep-end




//fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
  //  copyPublicFolder();
    // Start the webpack build
    build(0);

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');
  // @cep-begin
  try {
    cep.build();
  } catch (err) {
    console.log(chalk.red('Failed to compile CEP.\n'));
    printBuildError(err);
    process.exit(1);
  }

    cep.buildMessages();
  // @cep-end


}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => { return file !== paths.appHtml},
  });
}
