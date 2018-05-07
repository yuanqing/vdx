module.exports = function (speed) {
  if (speed) {
    return `setpts=(1/${speed})*PTS`
  }
}
