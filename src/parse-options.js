const parseTrim = require('./parse-trim')

function parseOptions (options) {
  const { crop, format, fps, noAudio, resize, speed, trim } = options
  const result = []
  const videoFilters = []
  const audioFilters = []

  if (!speed) {
    if (noAudio || format === 'gif') {
      // https://superuser.com/a/268986
      result.push({ c: 'copy', an: true })
    } else {
      // https://superuser.com/q/602983
      result.push({ 'c:a': 'copy' })
    }
  }

  if (fps) {
    // https://stackoverflow.com/a/28073732
    result.push({ r: fps })
  }

  if (trim) {
    result.push(parseTrim(trim, speed))
  }

  // https://superuser.com/a/624564
  if (resize) {
    videoFilters.push(`scale=${resize.width}:${resize.height}`)
  }

  // https://video.stackexchange.com/a/4571
  if (crop) {
    videoFilters.push(`crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`)
  }

  // http://trac.ffmpeg.org/wiki/How%20to%20speed%20up%20/%20slow%20down%20a%20video
  if (speed) {
    videoFilters.push(`setpts=(1/${1 / speed})*PTS`)
    audioFilters.push(`atempo=${speed}`)
  }

  // https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
  if (format === 'gif') {
    videoFilters.push(
      `split [a][b];[a] palettegen [palette];[b][palette] paletteuse`
    )
  }

  if (videoFilters.length !== 0) {
    result.push({ filter_complex: `"[0:v] ${videoFilters.join(',')}"` })
  }
  if (audioFilters.length !== 0) {
    result.push({ 'filter:a': `"${audioFilters.join(',')}"` })
  }
  return result
}

module.exports = parseOptions
