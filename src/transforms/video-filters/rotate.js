const mapAngleToFilter = {
  '-90': 'transpose=2',
  '90': 'transpose=1',
  '180': 'transpose=1,transpose=1'
}

module.exports = function (rotateOptions) {
  const filter = rotateOptions && mapAngleToFilter[`${rotateOptions.angle}`]
  if (filter) {
    return filter
  }
}
