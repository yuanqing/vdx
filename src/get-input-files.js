const promisify = require('util').promisify
const glob = promisify(require('glob'))
const STDIN_SENTINEL = require('./stdin-sentinel')

async function getInputFiles (globPatterns) {
  if (globPatterns.length === 0) {
    return [STDIN_SENTINEL]
  }
  const inputFiles = await Promise.all(
    globPatterns.map(async function (item) {
      return glob(item)
    })
  )
  return inputFiles.reduce(function (result, array) {
    return result.concat(array)
  }, [])
}

module.exports = getInputFiles
