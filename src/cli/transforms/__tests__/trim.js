const test = require('tape')
const trim = require('../trim')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof trim === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = ['', 'foo', '10,', '10:']
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      trim(unexpectedFormat)
    })
  })
})

test('parses start duration, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('10')
  const expected = {
    start: 10
  }
  t.looseEqual(actual, expected)
})

test('parses start and end durations, specified in seconds', function (t) {
  t.plan(1)
  const actual = trim('10,20')
  const expected = {
    start: 10,
    end: 20
  }
  t.looseEqual(actual, expected)
})

test('parses start duration, specified as a timestamp', function (t) {
  t.plan(1)
  const actual = trim('00:20')
  const expected = {
    start: '00:20'
  }
  t.looseEqual(actual, expected)
})

test('parses start and end durations, specified as timestamps', function (t) {
  t.plan(1)
  const actual = trim('00:20,01:02:03.141')
  const expected = {
    start: '00:20',
    end: '01:02:03.141'
  }
  t.looseEqual(actual, expected)
})
