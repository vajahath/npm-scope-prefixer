#! /usr/bin/env node

import { Command } from 'commander';
import { scopePrefixer } from '..';

const pkg = require('../../package.json');

const program = new Command();

program
  .version(pkg.version)
  .description('Changes the package.json name property to new scope.')
  .requiredOption(
    '-s, --scope <scope>',
    "[Required] The new @scope you want to use. The '@' is optional 😉."
  )
  .option(
    '-p, --pkg-path <path>',
    `Absolute or relative path to package.json. If not provided, package.json in the CWD is used.`
  );

program.parse(process.argv);

scopePrefixer(program.scope, program.pkgPath);
