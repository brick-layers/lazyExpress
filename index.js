#!/usr/bin/env node
'use strict'

const program = require('commander')
const chalk = require('chalk')
const pkg = require('./package.json')

const api = require('./api')

program
  .version(pkg.version)
  .command('lay <JSONPath> <buildPath>')
  .alias('l')
  .description('lay some express foundations')
  .action((JSONPath, buildPath) => {
    console.log(chalk.blue('json path:'), JSONPath)
    console.log(chalk.blue('build destination path:'), buildPath)
    api(JSONPath, buildPath)
  })

program.parse(process.argv)
