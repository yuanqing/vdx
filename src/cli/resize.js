const dimension = '(-1|\\d+)'
const regExp = new RegExp(`^${dimension}(?:,${dimension})?$`)

module.exports = {
  alias: ['r', 'scale', 's'],
  coerce: function (string) {
    const matches = string.match(regExp)
    if (matches === null) {
      throw new Error('Expected <width> or <width>,<height>')
    }
    const options = matches.slice(1)
    return {
      width: parseInt(options[0]) || -1,
      height: parseInt(options[1]) || -1
    }
  },
  default: null,
  type: ['string']
}
