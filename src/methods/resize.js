function resize (options) {
  // https://superuser.com/a/624564
  return {
    filter_complex: `scale=${options.width}:${options.height}`
  }
}

module.exports = resize
