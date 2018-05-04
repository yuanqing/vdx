const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))
const rimraf = promisify(require('rimraf'))
const uniqueSlug = require('unique-slug')
const STDIN_SENTINEL = require('./stdin-sentinel')

function stringify (options) {
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

function getTemporaryFilePath (inputFile, outputDirectory) {
  const basename = path.basename(inputFile)
  return path.join(outputDirectory, `vdx-${uniqueSlug()}-${basename}`)
}

function getOutputFilePath (inputFile, outputDirectory, outputFormat) {
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

function buildCommand (
  ffmpegPath,
  inputFile,
  outputDirectory,
  outputFormat,
  ffmpegOptions,
  ffmpegFilters
) {
  const temporaryFile = getTemporaryFilePath(inputFile, outputDirectory)
  const outputFile = getOutputFilePath(inputFile, outputDirectory, outputFormat)
  const parentDirectory = path.resolve(outputFile, '..')
  const c1 = `${ffmpegPath} -y -i "${inputFile}" ${stringify(
    ffmpegOptions
  )} -- "${temporaryFile}"`
  const c2 = `${ffmpegPath} -y -i "${temporaryFile}" ${stringify(
    ffmpegFilters
  )} -- "${outputFile}"`
  return async function () {
    await mkdirp(parentDirectory)
    try {
      await new Promise(async function (resolve) {
        const p1 = execa.shell(c1)
        if (inputFile === STDIN_SENTINEL) {
          p1.on('exit', function () {
            resolve()
          })
          process.stdin.pipe(p1.stdin)
          return
        }
        await p1
        resolve()
      })
      await execa.shell(c2)
    } finally {
      await rimraf(temporaryFile)
    }
  }
}

module.exports = buildCommand
