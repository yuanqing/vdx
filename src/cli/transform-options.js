const transforms = require('./transforms')

function transformOptions (options) {
  return Object.keys(options).reduce(function (result, key) {
    const transform = transforms[key]
    result[key] = transform ? transform(options[key]) : options[key]
    return result
  }, {})
}

module.exports = transformOptions
