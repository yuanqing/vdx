function computeAtempo (speed) {
  if (speed === 1) {
    return speed
  }
  const result = []
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
    return computeAtempo(speed)
      .map(function (aTempo) {
        return `atempo=${aTempo}`
      })
      .join(',')
  }
}
