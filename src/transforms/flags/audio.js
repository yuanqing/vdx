module.exports = function (hasAudio) {
  if (hasAudio === false) {
    return { an: true }
  }
  return { acodec: 'copy' }
}
