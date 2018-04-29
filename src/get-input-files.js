const promisify = require('util').promisify
const isGlob = require('is-glob')
const glob = promisify(require('glob'))

async function getInputFiles (input) {
  if (typeof input === 'undefined') {
    return Promise.resolve(['-'])
  }
  if (isGlob(input)) {
    return await glob(input)
  }
  return Promise.resolve()
}

module.exports = getInputFiles
