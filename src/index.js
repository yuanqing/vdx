const promiseAll = require('p-all')
const buildCommand = require('./build-command')
const getInputFiles = require('./get-input-files')
const parseOptions = require('./parse-options')

function vdx (options) {
  const ffmpegOptions = parseOptions(options)
  const convertToGif = options.gif !== -1
  return async function (inputGlobPatterns, outputDirectory) {
    const inputFiles = await getInputFiles(inputGlobPatterns)
    const commands = inputFiles.map(function (inputFile) {
      return buildCommand(
        inputFile,
        outputDirectory,
        convertToGif,
        ffmpegOptions
      )
    })
    return function () {
      return promiseAll(commands, { concurrency: options.parallel })
    }
  }
}

module.exports = vdx
