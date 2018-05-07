const dimension = '(\\d+)'
const regExp = new RegExp(
  `^${dimension},${dimension}(?:,${dimension},${dimension})?$`
)

module.exports = function (string) {
  const matches = string.match(regExp)
  if (matches === null) {
    throw new Error('Expected <width>,<height> or <x>,<y>,<width>,<height>')
  }
  const options = matches.slice(1)
  if (typeof options[2] === 'undefined') {
    return {
      x: 0,
      y: 0,
      width: parseInt(options[0]),
      height: parseInt(options[1])
    }
  }
  return {
    x: parseInt(options[0]),
    y: parseInt(options[1]),
    width: parseInt(options[2]),
    height: parseInt(options[3])
  }
}
