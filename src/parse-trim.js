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

function changeSpeed (duration, speed) {
  const operation = speed > 1 ? 'subtract' : 'add'
  return duration[operation](duration.asMilliseconds() / speed, 'milliseconds')
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

function trim (options, speed) {
  let startDuration = parseDuration(options.start)
  let endDuration = parseDuration(options.end)
  if (speed !== 1) {
    startDuration = changeSpeed(startDuration, speed)
    endDuration = changeSpeed(endDuration, speed)
  }
  const difference = endDuration.subtract(startDuration)
  // https://superuser.com/a/141343
  return {
    t: formatDuration(difference),
    ss: formatDuration(startDuration)
  }
}

module.exports = trim
