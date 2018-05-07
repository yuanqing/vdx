module.exports = function (format) {
  if (format === 'gif') {
    return `[0:v] split [v1][v2];[v1] palettegen [palette];[v2][palette] paletteuse`
  }
}
