const parseTrim = require('./parse-trim')

function parseOptions (options) {
  const { crop, format, fps, noAudio, resize, trim } = options
  const result = []
  const filters = []

  if (noAudio || format === 'gif') {
    // https://superuser.com/a/268986
    result.push({ c: 'copy', an: true })
  } else {
    // https://superuser.com/q/602983
    result.push({ 'c:a': 'copy' })
  }

  if (fps) {
    // https://stackoverflow.com/a/28073732
    result.push({ r: fps })
  }

  if (trim) {
    result.push(parseTrim(trim))
  }

  // https://superuser.com/a/624564
  if (resize) {
    filters.push(`scale=${resize.width}:${resize.height}`)
  }

  // https://video.stackexchange.com/a/4571
  if (crop) {
    filters.push(`crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`)
  }

  // https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
  if (format === 'gif') {
    filters.push(
      `split [a][b];[a] palettegen [palette];[b][palette] paletteuse`
    )
  }

  if (filters.length !== 0) {
    result.push({ filter_complex: `"[0:v] ${filters.join(',')}"` })
  }
  return result
}

module.exports = parseOptions
