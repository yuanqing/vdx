const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = promisify(require('rimraf'))

const log = require('./log')

function createFFmpegCommand (
  ffmpegBinaryPath,
  inputFile,
  outputFile,
  options
) {
  const stringifiedOptions = stringifyFFmpegOptions(options)
  return `${ffmpegBinaryPath} -y -i "${inputFile}" ${stringifiedOptions} -- "${outputFile}"`
}

function stringifyFFmpegOptions (options) {
  return Object.keys(options)
    .reduce(function (result, key) {
      const value = options[key]
      if (value) {
        result.push(`-${key}`)
        if (typeof value !== 'boolean') {
          result.push(value)
        }
      }
      return result
    }, [])
    .join(' ')
}

function setFileExtension (file, newExtension) {
  const parentDirectory = path.dirname(file)
  const extension = path.extname(file)
  const basename = path.basename(file, extension)
  return path.join(parentDirectory, `${basename}.${newExtension}`)
}

function getTemporaryFilePath (inputFile, outputDirectory) {
  const temporaryFile = path.basename(inputFile)
  return path.join(outputDirectory, '.vdx', `${temporaryFile}`)
}

function getOutputFilePath (inputFile, outputDirectory, outputFormat) {
  const outputFile =
    typeof outputFormat === 'undefined'
      ? inputFile
      : setFileExtension(inputFile, outputFormat)
  return path.join(outputDirectory, outputFile)
}

function runCommand (command, isDebug) {
  if (isDebug) {
    log.info(command)
  }
  return execa.command(command, { shell: true })
}

function createCommand (
  inputFile,
  outputDirectory,
  format,
  ffmpegBinaryPath,
  ffmpegOptions,
  isDebug
) {
  const temporaryFile = getTemporaryFilePath(inputFile, outputDirectory)
  const outputFile = getOutputFilePath(inputFile, outputDirectory, format)

  const hasFilters = ffmpegOptions.audioFilters || ffmpegOptions.videoFilters

  return async function () {
    log.start(inputFile)
    mkdirp.sync(path.resolve(outputFile, '..'))
    try {
      if (hasFilters) {
        await mkdirp(path.resolve(temporaryFile, '..'))
      }
      const flagCommand = createFFmpegCommand(
        ffmpegBinaryPath,
        inputFile,
        hasFilters ? temporaryFile : outputFile,
        ffmpegOptions.flags
      )
      await runCommand(flagCommand, isDebug)
      if (hasFilters) {
        const filtersCommand = createFFmpegCommand(
          ffmpegBinaryPath,
          temporaryFile,
          outputFile,
          {
            af: ffmpegOptions.audioFilters,
            vf: ffmpegOptions.videoFilters
          }
        )
        await runCommand(filtersCommand, isDebug)
      }
      log.success(outputFile)
    } catch (error) {
      log.error(outputFile)
    } finally {
      await rimraf(temporaryFile)
    }
  }
}

module.exports = createCommand
