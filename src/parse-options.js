const parseTrim = require('./parse-trim')

function parseOptions (options) {
  const { fps, noAudio, trim } = options
  const result = []

  if (noAudio) {
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

  return result
}

module.exports = parseOptions
