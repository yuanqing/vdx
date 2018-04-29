const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))

function stringifyOptions (options) {
  const result = []
  const filters = []
  options.forEach(function(option) {
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

function buildOutputFile (inputFile, outputDirectory, isGif) {
  if (isGif) {
    const inputFileParentDirectory = path.dirname(inputFile)
    const inputFileExtension = path.extname(inputFile)
    const outputFile = `${path.basename(inputFile, inputFileExtension)}.gif`
    return path.join(outputDirectory, inputFileParentDirectory, outputFile)
  }
  return path.join(outputDirectory, inputFile)
}

function buildCommand (inputFile, outputDirectory, convertToGif, options) {
  const stringifiedOptions = stringifyOptions(options)
  const outputFile = buildOutputFile(inputFile, outputDirectory, convertToGif)
  const outputFileParentDirectory = path.resolve(outputFile, '..')
  const ffmpegCommand = `ffmpeg -y -i ${inputFile} ${stringifiedOptions} -- ${outputFile}`
  return async function () {
    await mkdirp(outputFileParentDirectory)
    return execa.shell(ffmpegCommand, { stdio: ['pipe', 'ignore', 'ignore'] })
  }
}

module.exports = buildCommand
