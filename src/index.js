const pAll = require('p-all')

const buildCommand = require('./build-command')
const getInputFiles = require('./get-input-files')
const methods = require('./methods')

function translateOptions (options) {
  const result = {}
  return Object.keys(methods).reduce(function (result, key) {
    return {
      ...result,
      ...methods[key](options[key])
    }
  }, {})
}

class Vdx {
  constructor (options) {
    this.options = options || {}
    Object.keys(methods).forEach(function (key) {
      this[key] = function (value) {
        this.options[key] = value
      }.bind(this)
    }, this)
  }
  async run (input, outputDirectory) {
    const inputFiles = await getInputFiles(input)
    const options = translateOptions(this.options)
    const commands = inputFiles.map(function (inputFile) {
      return buildCommand(inputFile, outputDirectory, options)
    })
    return pAll(commands, {concurrency: this.options.parallel})
  }
}

function vdx (options) {
  return new Vdx(options)
}

module.exports = vdx
