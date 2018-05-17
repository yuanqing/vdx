const test = require('tape')
const transformOptions = require('../transform-options')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof transformOptions === 'function')
})
