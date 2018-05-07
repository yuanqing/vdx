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

function parseDuration (duration, speed) {
  const matches = duration.match(separatorRegExp)
  if (matches) {
    if (matches.length === 1) {
      return moment.duration(`00:${duration}`)
    }
    return moment.duration(duration)
  }
  return moment.duration(parseFloat(duration), 'seconds')
}

module.exports = function (trimOptions) {
  if (trimOptions) {
    let startDuration = parseDuration(trimOptions.start)
    const ss = formatDuration(startDuration)
    if (typeof trimOptions.end === 'undefined') {
      return {
        ss
      }
    }
    let endDuration = parseDuration(trimOptions.end)
    const difference = endDuration.subtract(startDuration)
    return {
      t: formatDuration(difference),
      ss
    }
  }
}
