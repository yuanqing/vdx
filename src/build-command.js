const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))
const uniqueSlug = require('unique-slug')
const STDIN_SENTINEL = require('./stdin-sentinel')

function stringifyOptions (options) {
  const result = []
  const filters = []
  options.forEach(function (option) {
    Object.keys(option).forEach(function (key) {
      const value = option[key]
      if (value) {
        if (key === 'filter_complex') {
          filters.push(value)
          return
        }
        result.push(`-${key}`)
        if (typeof value === 'string') {
          result.push(value)
        }
      }
    })
  })
  return `${result.join(' ')} -filter_complex "[0:v] ${filters.join(',')}"`
}

function buildOutputFilePath (inputFile, outputDirectory, convertToGif) {
  inputFile = inputFile === STDIN_SENTINEL ? `${uniqueSlug()}.mov` : inputFile
  if (convertToGif) {
    const inputFileExtension = path.extname(inputFile)
    const inputFileParentDirectory = path.dirname(inputFile)
    const outputFile = `${path.basename(inputFile, inputFileExtension)}.gif`
    return path.join(outputDirectory, inputFileParentDirectory, outputFile)
  }
  return path.join(outputDirectory, inputFile)
}

function buildCommand (inputFile, outputDirectory, convertToGif, options) {
  const stringifiedOptions = stringifyOptions(options)
  const outputFile = buildOutputFilePath(
    inputFile,
    outputDirectory,
    convertToGif
  )
  const outputFileParentDirectory = path.resolve(outputFile, '..')
  const ffmpegCommand = `ffmpeg -y -i "${inputFile}" ${stringifiedOptions} -- "${outputFile}"`
  return function () {
    return new Promise(async function (resolve) {
      await mkdirp(outputFileParentDirectory)
      const ffmpegProcess = execa.shell(ffmpegCommand)
      if (inputFile === STDIN_SENTINEL) {
        ffmpegProcess.on('close', function (code) {
          resolve()
        })
        process.stdin.pipe(ffmpegProcess.stdin)
        return
      }
      resolve()
    })
  }
}

module.exports = buildCommand
