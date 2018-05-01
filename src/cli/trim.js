const hourMinuteSecond = '(?:[0-9]|[0-5][0-9])'
const millisecond = '\\d{1,3}'
const time = `((?:\\d+|(?:${hourMinuteSecond}:)?${hourMinuteSecond}:${hourMinuteSecond})(?:\\.${millisecond})?)`
const regExp = new RegExp(`^${time}(?:,${time})?$`)

module.exports = {
  alias: ['t'],
  type: ['string'],
  coerce: function (string) {
    const matches = string.match(regExp)
    if (matches === null) {
      throw new Error('Expected <end> or <start>,<end>')
    }
    const options = matches.slice(1)
    if (typeof options[1] === 'undefined') {
      return {
        start: '0',
        end: options[0]
      }
    }
    return {
      start: options[0],
      end: options[1]
    }
  }
}
