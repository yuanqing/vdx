module.exports = function (hasAudio) {
  if (hasAudio) {
    return { 'c:a': 'copy' }
  }
  return { c: 'copy', an: true }
}
