const regExp = /^(-90|90|180)$/

module.exports = function (string) {
  const matches = string.match(regExp)
  if (matches === null) {
    throw new Error('Expected one of -90, 90, or 180')
  }
  const options = matches.slice(1)
  return {
    angle: options[0]
  }
}
