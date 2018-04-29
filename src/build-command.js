const promisify = require('util').promisify
const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))

function buildCommand (inputFile, outputDirectory, options) {
  const stringifiedOptions = options
    .reduce(function (result, option) {
      Object.keys(option).forEach(function (key) {
        const value = option[key]
        if (value) {
          result.push(`-${key}`)
          if (typeof value === 'string') {
            result.push(value)
          }
        }
      })
      return result
    }, [])
    .join(' ')
  const outputFile = path.join(outputDirectory, inputFile)
  const outputFileParentDirectory = path.resolve(outputFile, '..')
  const ffmpegCommand = `ffmpeg -y -i ${inputFile} ${stringifiedOptions} -- ${outputFile}`
  return async function () {
    await mkdirp(outputFileParentDirectory)
    return execa.shell(ffmpegCommand)
  }
}

module.exports = buildCommand
