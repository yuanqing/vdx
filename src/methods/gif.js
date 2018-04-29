function gif (fps) {
  // https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
  if (fps === -1) {
    return {}
  }
  return {
    filter_complex: `fps=${fps},split [a][b];[a] palettegen [palette];[b][palette] paletteuse`
  }
}

module.exports = gif
