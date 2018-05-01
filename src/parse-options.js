const methods = require('./methods')

function parseOptions (options) {
  return Object.keys(options).reduce(function (result, key) {
    const method = methods[key]
    if (method) {
      result.push(method(options[key]))
    }
    return result
  }, [])
}

module.exports = parseOptions
