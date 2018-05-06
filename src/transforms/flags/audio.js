module.exports = function (hasAudio) {
  if (hasAudio) {
    // https://superuser.com/q/602983
    return { 'c:a': 'copy' }
  }
  // https://superuser.com/a/268986
  return { c: 'copy', an: true }
}
