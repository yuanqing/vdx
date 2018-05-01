#!/usr/bin/env node

const yargs = require('yargs')
const vdx = require('..')

const optionsConfig = {
  crop: require('./crop'),
  format: require('./format'),
  outputDirectory: require('./output-directory'),
  noAudio: require('./no-audio'),
  parallel: require('./parallel'),
  resize: require('./resize'),
  trim: require('./trim')
}

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
