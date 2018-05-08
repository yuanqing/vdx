module.exports = function (hasAudio) {
  if (hasAudio || typeof hasAudio === 'undefined') {
    return { 'c:a': 'copy' }
  }
  return { c: 'copy', an: true }
}
