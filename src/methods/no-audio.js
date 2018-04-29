function noAudio (noAudio) {
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
