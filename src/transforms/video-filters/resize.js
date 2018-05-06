module.exports = function (resizeOptions) {
  if (resizeOptions) {
    return `scale=${resizeOptions.width}:${resizeOptions.height}`
  }
  return null
}
