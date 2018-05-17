const test = require('tape')
const trim = require('../trim')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof trim === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = ['', 'foo', '5,', '5:']
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      trim(unexpectedFormat)
    })
  })
})

test('parses start duration, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('5')
  const expected = {
    start: '5'
  }
  t.looseEqual(actual, expected)
})

test('parses start and end durations, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('5,10')
  const expected = {
    start: '5',
    end: '10'
  }
  t.looseEqual(actual, expected)
})

test('parses start duration, specified as a timestamp', function (t) {
  t.plan(1)
  const actual = trim('00:05')
  const expected = {
    start: '00:05'
  }
  t.looseEqual(actual, expected)
})

test('parses start and end durations, specified as timestamps', function (t) {
  t.plan(1)
  const actual = trim('00:01,02:03:04.567')
  const expected = {
    start: '00:01',
    end: '02:03:04.567'
  }
  t.looseEqual(actual, expected)
})
