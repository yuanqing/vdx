function splitSpeed (speed) {
  const result = []
  if (speed === 1) {
    return result
  }
  if (speed > 2) {
    while (speed > 2) {
      speed = speed / 2
      result.push(2)
    }
    result.push(speed)
    return result
  }
  while (speed < 0.5) {
    speed = speed / 0.5
    result.push(0.5)
  }
  result.push(speed)
  return result
}

module.exports = function (speed) {
  if (speed) {
    const split = splitSpeed(speed)
    if (split.length === 0) {
      return null
    }
    return split
      .map(function (atempo) {
        return `atempo=${atempo}`
      })
      .join(',')
  }
}
