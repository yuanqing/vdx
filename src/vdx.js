const promisify = require('util').promisify
const promiseAll = require('p-all')
const which = promisify(require('which'))
const createCommand = require('./create-command')
const createFFmpegOptions = require('./create-ffmpeg-options')
const getInputFiles = require('./get-input-files')

async function vdx (options) {
  const ffmpegBinaryPath = await which('ffmpeg')
  const ffmpegOptions = createFFmpegOptions(options)
  const concurrency = options.parallel || 3
  return async function (globPatterns, outputDirectory) {
    outputDirectory = outputDirectory || 'build'
    const inputFiles = await getInputFiles(globPatterns)
    const commands = inputFiles.map(function (inputFile) {
      return createCommand(
        inputFile,
        outputDirectory,
        options.format,
        ffmpegBinaryPath,
        ffmpegOptions,
        options.debug
      )
    })
    return promiseAll(commands, { concurrency })
  }
}

module.exports = vdx
