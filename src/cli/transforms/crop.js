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
      x: '0',
      y: '0',
      width: options[0],
      height: options[1]
    }
  }
  return {
    x: options[0],
    y: options[1],
    width: options[2],
    height: options[3]
  }
}
