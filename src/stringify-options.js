function stringifyOptions (options) {
  return Object.keys(options)
    .reduce(function (result, key) {
      const value = options[key]
      if (value) {
        result.push(`-${key}`)
        if (typeof value !== 'boolean') {
          result.push(value)
        }
      }
      return result
    }, [])
    .join(' ')
}

module.exports = stringifyOptions
