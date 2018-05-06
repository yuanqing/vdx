const ora = require('ora')

function logger (text) {
  return ora().start(text)
}

module.exports = logger
