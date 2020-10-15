const test = require('tape')
const trim = require('../trim')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof trim === 'function')
})

test('returns `undefined` if called without arguments', function (t) {
  t.plan(1)
  t.true(typeof trim() === 'undefined')
})

test('parses the start time, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim({
    start: '5'
  })
  const expected = {
    ss: '00:00:05.000'
  }
  t.deepEqual(actual, expected)
})

test('parses the start time, specified as a timestamp', function (t) {
  t.plan(1)
  const actual = trim({
    start: '0:05'
  })
  const expected = {
    ss: '00:00:05.000'
  }
  t.deepEqual(actual, expected)
})

test('calculates the correct duration based on the start and end times', function (t) {
  t.plan(1)
  const actual = trim({
    start: '0:05',
    end: '02:03:04.567'
  })
  const expected = {
    t: '02:02:59.567',
    ss: '00:00:05.000'
  }
  t.deepEqual(actual, expected)
})
