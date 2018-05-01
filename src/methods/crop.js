function crop (options) {
  // https://video.stackexchange.com/a/4571
  return {
    filter_complex: `crop=${options.width}:${options.height}:${options.x}:${
      options.y
    }`
  }
}

module.exports = crop
