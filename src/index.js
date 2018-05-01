const promisify = require('util').promisify
const promiseAll = require('p-all')
const which = promisify(require('which'))
const buildCommand = require('./build-command')
const getInputFiles = require('./get-input-files')
const parseOptions = require('./parse-options')

async function vdx (options) {
  const ffmpegPath = await which('ffmpeg')
  const ffmpegOptions = parseOptions(options)
  return async function (inputGlobs, outputDirectory) {
    const inputFiles = await getInputFiles(inputGlobs)
    const commands = inputFiles.map(function (inputFile) {
      return buildCommand(
        ffmpegPath,
        inputFile,
        outputDirectory,
        options.format,
        ffmpegOptions
      )
    })
    return promiseAll(commands, { concurrency: options.parallel })
  }
}

module.exports = vdx
