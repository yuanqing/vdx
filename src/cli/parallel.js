module.exports = {
  alias: ['p'],
  type: ['boolean', 'number'],
  default: 3,
  coerce: function (parallel) {
    if (parallel === false) {
      return 1
    }
    if (parallel === true) {
      return 3
    }
    return Math.max(parseInt(parallel), 1)
  }
}
