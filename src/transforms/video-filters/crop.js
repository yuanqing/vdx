module.exports = function (cropOptions) {
  if (cropOptions) {
    return `crop=${cropOptions.width}:${cropOptions.height}:${cropOptions.x}:${
      cropOptions.y
    }`
  }
}
