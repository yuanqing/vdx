const promisify = require('util').promisify

const execa = require('execa')
const path = require('path')
const mkdirp = promisify(require('mkdirp'))

function buildCommand (inputFile, outputDirectory, options) {
  const stringifiedOptions = Object.keys(options)
    .reduce(function (result, key) {
      const value = options[key]
      if (value) {
        result.push(`-${key}`)
        if (typeof value === 'string') {
          result.push(value)
        }
      }
      return result
    }, [])
    .join(' ')
  const outputFile = path.join(outputDirectory, inputFile)
  const directory = path.resolve(outputFile, '..')
  const ffmpegCommand = `ffmpeg -y -i ${inputFile} ${stringifiedOptions} -- ${outputFile}`
  return async function() {
    await mkdirp(directory)
    return execa.shell(ffmpegCommand)
  }
}

module.exports = buildCommand
