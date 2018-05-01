function noAudio (noAudio) {
  // https://superuser.com/a/268986
  if (noAudio) {
    return {
      c: 'copy',
      an: true
    }
  }
  return {
    'c:a': 'copy'
  }
}

module.exports = noAudio
module.exports.config = require('./config')
