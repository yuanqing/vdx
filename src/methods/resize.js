function resize (options) {
  // https://superuser.com/a/624564
  return {
    s: `${options.width}x${options.height}`
  }
}

module.exports = resize
