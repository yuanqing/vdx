const methods = require('./methods')

function parse (optionNames, options) {
  return optionNames.reduce(function (result, key) {
    const value = methods[key](options[key])
    if (value) {
      result.push(value)
    }
    return result
  }, [])
}

const standardMethods = ['noAudio', 'trim']
const filterMethods = ['crop', 'resize', 'format']

function parseOptions (options) {
  const standardOptions = parse(standardMethods, options)
  const filterOptions = parse(filterMethods, options).map(function (item) {
    return item.filter_complex
  })
  return [
    ...standardOptions,
    {
      filter_complex: `"[0:v] ${filterOptions.join(',')}"`
    }
  ]
}

module.exports = parseOptions
