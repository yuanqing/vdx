#!/usr/bin/env node

const yargs = require('yargs')
const vdx = require('..')
const methods = require('./methods')

const optionsConfig = Object.keys(methods).reduce(function (result, key) {
  result[key] = methods[key].config
  return result
}, {})

async function main () {
  const parsed = yargs.options(optionsConfig).argv
  const inputGlobs = parsed._
  const { outputDirectory, ...options } = Object.keys(optionsConfig).reduce(
    function (result, key) {
      const value = parsed[key]
      if (typeof value !== 'undefined') {
        result[key] = value
      }
      return result
    },
    {}
  )
  const run = await vdx(options)
  await run(inputGlobs, outputDirectory)
}
main()
