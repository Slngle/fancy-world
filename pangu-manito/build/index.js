#!/usr/bin/env node
'use strict'
var currentNodeVersion = process.versions.node
var semver = currentNodeVersion.split('.')
var major = (semver[0] && Number(semver[0])) || 0
var lastVertion = 11
if (major < lastVertion) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create React App requires Node ' +
      lastVertion +
      ' or higher. \n' +
      'Please update your version of Node.'
  )
  process.exit(1)
}
var pangu = require('./cli')
pangu.cli(process.argv)
