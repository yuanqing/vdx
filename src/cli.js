#!/usr/bin/env node

const yargs = require('yargs')
const vdx = require('.')

const optionsConfig = {
  crop: {
    alias: ['c'],
    coerce: function (x, y, width, height) {
      if (options.length === 2) {
        return {
          x: 0,
          y: 0,
          width: parseInt(width),
          height: parseInt(height)
        }
      }
      return {
        x: parseInt(options[0]),
        y: parseInt(options[1]),
        width: parseInt(options[2]),
        height: parseInt(options[3])
      }
    },
    describe: '',
    type: 'array'
  },
  gif: {
    alias: ['g'],
    coerce: function (gif) {
      if (gif === true) {
        return 12
      }
      return gif
    },
    default: -1,
    describe: '',
    type: ['boolean', 'number']
  },
  noAudio: {
    alias: ['n'],
    default: false,
    describe: '',
    type: 'boolean'
  },
  resize: {
    alias: ['r', 'scale', 's'],
    coerce: function (options) {
      const width = options[0]
      const height = options[1]
      return {
        width: parseInt(width),
        height: typeof height === 'undefined' ? -2 : parseInt(height)
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

async function main () {
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
