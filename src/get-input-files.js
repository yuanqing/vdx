const promisify = require('util').promisify
const glob = promisify(require('glob'))

const stdinSentinel = '-'

async function getInputFiles (globPatterns) {
  if (globPatterns.length === 0) {
    return [stdinSentinel]
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
