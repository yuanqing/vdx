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

function trim (options) {
  // https://superuser.com/a/141343
  const startDuration = moment.duration(options.start, timestampFormat)
  const ss = formatDuration(startDuration)
  if (typeof options.end === 'number') {
    return {
      t: `${options.end}`,
      ss
    }
  }
  const endDuration = moment.duration(options.end, timestampFormat)
  const difference = endDuration.subtract(startDuration)
  return {
    t: formatDuration(difference),
    ss
  }
}

module.exports = trim
module.exports.config = require('./config')
