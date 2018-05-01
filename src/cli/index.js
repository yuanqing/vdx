#!/usr/bin/env node

const yargs = require('yargs')
const vdx = require('..')

const optionsConfig = {
  crop: require('./crop'),
  debug: require('./debug'),
  gif: require('./gif'),
  noAudio: require('./no-audio'),
  outputDirectory: require('./output-directory'),
  parallel: require('./parallel'),
  resize: require('./resize'),
  trim: require('./trim')
}

async function main () {
  const parsed = yargs.options(optionsConfig).argv
  const input = parsed._
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
  const parse = vdx(options)
  const run = await parse(input, outputDirectory)
  await run()
}
main()
