const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))
const rimraf = promisify(require('rimraf'))
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
  const hasOutputFormat = typeof outputFormat !== 'undefined'
  let outputFile = inputFile
  if (inputFile === STDIN_SENTINEL) {
    outputFile = `${uniqueSlug()}.${hasOutputFormat ? outputFormat : 'mp4'}`
  }
  if (hasOutputFormat) {
    outputFile = changeExtension(outputFile, outputFormat)
  }
  return path.join(outputDirectory, outputFile)
}

function buildTemporaryFilePath (outputFile) {
  const parentDirectory = path.dirname(outputFile)
  const basename = path.basename(outputFile)
  return path.join(parentDirectory, `.${basename}`)
}

function buildCommand (
  ffmpegPath,
  inputFile,
  outputDirectory,
  outputFormat,
  ffmpegOptions,
  ffmpegFilters
) {
  const outputFile = buildOutputFilePath(
    inputFile,
    outputDirectory,
    outputFormat
  )
  const outputFileParentDirectory = path.resolve(outputFile, '..')
  const temporaryFile = buildTemporaryFilePath(outputFile)
  const c1 = `${ffmpegPath} -y -i "${inputFile}" ${stringifyOptions(
    ffmpegOptions
  )} -- "${temporaryFile}"`
  const c2 = `${ffmpegPath} -y -i "${temporaryFile}" ${stringifyOptions(
    ffmpegFilters
  )} -- "${outputFile}"`
  return async function () {
    await mkdirp(outputFileParentDirectory)
    try {
      await new Promise(async function (resolve) {
        const ffmpegProcess = execa.shell(c1)
        if (inputFile === STDIN_SENTINEL) {
          ffmpegProcess.on('exit', function (code) {
            resolve()
          })
          process.stdin.pipe(ffmpegProcess.stdin)
          return
        }
        await ffmpegProcess
        resolve()
      })
      await execa.shell(c2)
    } finally {
      await rimraf(temporaryFile)
    }
  }
}

module.exports = buildCommand
