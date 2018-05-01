const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))
const uniqueSlug = require('unique-slug')
const STDIN_SENTINEL = require('./stdin-sentinel')

function stringifyOptions (options) {
  const result = []
  options.forEach(function (option) {
    Object.keys(option).forEach(function (key) {
      const value = option[key]
      if (value) {
        result.push(`-${key}`)
        if (value !== true) {
          result.push(value)
        }
      }
    })
  })
  return result.join(' ')
}

function changeExtension (file, newExtension) {
  const parentDirectory = path.dirname(file)
  const extension = path.extname(file)
  const basename = path.basename(file, extension)
  return path.join(parentDirectory, `${basename}.${newExtension}`)
}

function buildOutputFilePath (inputFile, outputDirectory, outputFormat) {
  let outputFile = inputFile
  if (inputFile === STDIN_SENTINEL) {
    outputFile = `${uniqueSlug()}.${
      outputFormat !== null ? outputFormat : 'mp4'
    }`
  }
  if (outputFormat !== null) {
    outputFile = changeExtension(outputFile, outputFormat)
  }
  return path.join(outputDirectory, outputFile)
}

function buildCommand (
  ffmpegPath,
  inputFile,
  outputDirectory,
  outputFormat,
  ffmpegOptions
) {
  const stringifiedOptions = stringifyOptions(ffmpegOptions)
  const outputFile = buildOutputFilePath(
    inputFile,
    outputDirectory,
    outputFormat
  )
  const outputFileParentDirectory = path.resolve(outputFile, '..')
  const ffmpegCommand = `${ffmpegPath} -y -i "${inputFile}" ${stringifiedOptions} -- "${outputFile}"`
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
