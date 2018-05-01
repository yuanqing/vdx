const moment = require('moment')

const timestampFormat = 'HH:mm:ss.SSS'
function formatDuration (duration) {
  return moment()
    .startOf('year')
    .add({
      h: duration.hours(),
      m: duration.minutes(),
      s: duration.seconds(),
      ms: duration.milliseconds()
    })
    .format(timestampFormat)
}

const separatorRegExp = /:/g
function parseDuration (duration) {
  const matches = duration.match(separatorRegExp)
  if (matches) {
    if (matches.length === 1) {
      return moment.duration(`00:${duration}`)
    }
    return moment.duration(duration)
  }
  return moment.duration(parseFloat(duration), 'seconds')
}

function trim (options, speed) {
  const startDuration = parseDuration(options.start)
  const endDuration = parseDuration(options.end)
  const difference = endDuration.subtract(startDuration)
  // https://superuser.com/a/141343
  return {
    t: formatDuration(difference),
    ss: formatDuration(startDuration)
  }
}

module.exports = trim
