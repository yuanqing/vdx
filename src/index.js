const promiseAll = require('p-all')

const buildCommand = require('./build-command')
const getInputFiles = require('./get-input-files')
const methods = require('./methods')

function translateOptions (options) {
  return Object.keys(options).reduce(function (result, key) {
    const method = methods[key]
    if (method) {
      result.push(method(options[key]))
    }
    return result
  }, [])
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
    const options = translateOptions(this.options)
    const convertToGif = this.options.gif !== -1
    const inputFiles = await getInputFiles(input)
    const commands = inputFiles.map(function (inputFile) {
      return buildCommand(inputFile, outputDirectory, convertToGif, options)
    })
    return promiseAll(commands, { concurrency: this.options.parallel })
  }
}

function vdx (options) {
  return new Vdx(options)
}

module.exports = vdx
