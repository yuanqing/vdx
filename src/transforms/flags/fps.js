module.exports = function (fps) {
  if (fps) {
    // https://stackoverflow.com/a/28073732
    return { r: fps }
  }
}
