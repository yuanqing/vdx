function crop (x, y, width, height) {
  // https://video.stackexchange.com/a/4571
  return {
    vf: `crop=${width}:${height}:${x}:${y}`
  }
}

module.exports = crop
