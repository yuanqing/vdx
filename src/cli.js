#!/usr/bin/env node

const yargs = require('yargs')
const vdx = require('.')

const optionsConfig = {
  crop: {
    alias: ['c'],
    describe: '',
    type: 'array'
  },
  gif: {
    alias: ['g'],
    default: false,
    describe: '',
    type: 'boolean'
  },
  noAudio: {
    alias: ['n'],
    default: false,
    describe: '',
    type: 'boolean'
  },
  resize: {
    alias: 'r',
    coerce: function (options) {
      return {
        width: parseInt(options[0]),
        height: parseInt(options[1])
      }
    },
    describe: '',
    type: 'array'
  },
  trim: {
    alias: ['t'],
    describe: '',
    type: 'array',
    coerce: function (options) {
      return {
        startTimestamp: options[0],
        endTimestamp: options[1]
      }
    }
  },
  outputDirectory: {
    alias: ['output', 'o'],
    default: 'build',
    describe: '',
    type: 'string'
  },
  parallel: {
    alias: ['p'],
    default: 3,
    describe: '',
    type: 'number'
  }
}

async function main() {
  const parsed = yargs.options(optionsConfig).argv
  const input = parsed._[0]
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
  await vdx(options).run(input, outputDirectory)
}
main()
