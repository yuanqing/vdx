const promisify = require('util').promisify
const glob = promisify(require('glob'))

async function getInputFiles (globPatterns) {
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
