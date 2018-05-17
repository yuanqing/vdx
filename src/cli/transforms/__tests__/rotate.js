const test = require('tape')
const rotate = require('../rotate')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof rotate === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = ['', 'foo', '0', '270', '-180']
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      rotate(unexpectedFormat)
    })
  })
})

test('parses 90 degrees clockwise', function (t) {
  t.plan(1)
  const actual = rotate('90')
  const expected = {
    angle: '90'
  }
  t.looseEqual(actual, expected)
})

test('parses 90 degrees counter clockwise', function (t) {
  t.plan(1)
  const actual = rotate('-90')
  const expected = {
    angle: '-90'
  }
  t.looseEqual(actual, expected)
})

test('parses 180 degrees', function (t) {
  t.plan(1)
  const actual = rotate('180')
  const expected = {
    angle: '180'
  }
  t.looseEqual(actual, expected)
})
