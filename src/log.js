const npmlog = require('npmlog')

npmlog.disp.error = 'error'
npmlog.style.error = {
  fg: 'red'
}
function error (message) {
  npmlog.error('', message)
}

npmlog.style.info.fg = 'yellow'
function info (message) {
  npmlog.info('', message)
}

npmlog.addLevel('start', 2001, { fg: 'blue' })
function start (message) {
  npmlog.start('', message)
}

npmlog.addLevel('success', 3001, { fg: 'green' })
function success (message) {
  npmlog.success('', message)
}

module.exports = {
  error,
  info,
  start,
  success
}
