const regExp = /^(-90|90|180)$/

module.exports = function (string) {
  const matches = string.match(regExp)
  if (matches === null) {
    throw new Error('Expected <width>,<height> or <x>,<y>,<width>,<height>')
  }
  const options = matches.slice(1)
  return {
    angle: parseInt(options[0])
  }
}
