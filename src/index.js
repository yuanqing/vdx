const promisify = require('util').promisify
const promiseAll = require('p-all')
const which = promisify(require('which'))
const createCommand = require('./create-command')
const createFFmpegOptions = require('./create-ffmpeg-options')
const getInputFiles = require('./get-input-files')

async function vdx (options, logger) {
  const { audio, crop, format, fps, parallel, resize, reverse, speed, trim } = options
  const ffmpegBinaryPath = await which('ffmpeg')
  const ffmpegOptions = createFFmpegOptions({
    audio,
    crop,
    format,
    fps,
    resize,
    reverse,
    speed,
    trim
  })
  const concurrency = parallel || 1
  return async function (input, outputDirectory) {
    const inputFiles = await getInputFiles(input)
    const commands = inputFiles.map(function (inputFile) {
      return createCommand(
        inputFile,
        outputDirectory,
        format,
        ffmpegBinaryPath,
        ffmpegOptions,
        logger
      )
    })
    return promiseAll(commands, { concurrency })
  }
}

module.exports = vdx
