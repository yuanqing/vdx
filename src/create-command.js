const promisify = require('util').promisify
const consola = require('consola')
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))
const rimraf = promisify(require('rimraf'))
const uniqueSlug = require('unique-slug')
const stringifyOptions = require('./stringify-options')

const stdinSentinel = '-'
const defaultFileExtension = 'mp4'

function setFileExtension (file, newExtension) {
  const parentDirectory = path.dirname(file)
  const extension = path.extname(file)
  const basename = path.basename(file, extension)
  return path.join(parentDirectory, `${basename}.${newExtension}`)
}

function createTemporaryFilePath (inputFile, outputDirectory) {
  const temporaryFile =
    inputFile === stdinSentinel
      ? `${uniqueSlug()}.${defaultFileExtension}`
      : path.basename(inputFile)
  return path.join(outputDirectory, `temp-${temporaryFile}`)
}

function createOutputFilePath (inputFile, outputDirectory, outputFormat) {
  let outputFile = inputFile
  if (outputFile === stdinSentinel) {
    outputFile = `${uniqueSlug()}.${defaultFileExtension}`
  }
  if (typeof outputFormat !== 'undefined') {
    outputFile = setFileExtension(outputFile, outputFormat)
  }
  return path.join(outputDirectory, outputFile)
}

function createCommand (
  inputFile,
  outputDirectory,
  format,
  ffmpegBinaryPath,
  ffmpegOptions
) {
  const temporaryFile = createTemporaryFilePath(inputFile, outputDirectory)
  const outputFile = createOutputFilePath(inputFile, outputDirectory, format)
  const parentDirectory = path.resolve(outputFile, '..')

  const c1 = `${ffmpegBinaryPath} -y -i "${inputFile}" ${stringifyOptions(
    ffmpegOptions.flags
  )} -- "${temporaryFile}"`
  const c2 = `${ffmpegBinaryPath} -y -i "${temporaryFile}" ${stringifyOptions(
    ffmpegOptions.filters
  )} -- "${outputFile}"`

  const isStdin = inputFile === stdinSentinel

  return async function () {
    consola.start(isStdin ? 'stdin' : inputFile)
    await mkdirp(parentDirectory)
    try {
      await new Promise(async function (resolve) {
        const p1 = execa.shell(c1)
        if (isStdin) {
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
      consola.success(outputFile)
    } catch (error) {
      consola.error(outputFile)
    } finally {
      await rimraf(temporaryFile)
    }
  }
}

module.exports = createCommand
