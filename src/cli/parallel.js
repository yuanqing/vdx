module.exports = {
  alias: ['p'],
  coerce: function (parallel) {
    if (parallel === true) {
      return 3
    }
    return parseInt(parallel)
  },
  default: 3,
  type: ['boolean', 'number']
}
