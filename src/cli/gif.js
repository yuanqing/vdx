const gif = {
  alias: ['g'],
  coerce: function (gif) {
    if (gif === true) {
      return 12
    }
    return gif
  },
  default: -1,
  type: ['boolean', 'number']
}

module.exports = gif
