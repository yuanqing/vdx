function format (format) {
  // https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
  if (format === 'gif') {
    return {
      filter_complex: `split [a][b];[a] palettegen [palette];[b][palette] paletteuse`
    }
  }
  return {}
}

module.exports = format
module.exports.config = require('./config')
