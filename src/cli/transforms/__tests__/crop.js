const test = require('tape')
const crop = require('../crop')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof crop === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = [
    '',
    'foo',
    '10',
    '360,',
    '10,20,360',
    '10,20,360,-1'
  ]
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      crop(unexpectedFormat)
    })
  })
})

test('parses width and height', function (t) {
  t.plan(1)
  const actual = crop('360,640')
  const expected = {
    x: 0,
    y: 0,
    width: 360,
    height: 640
  }
  t.looseEqual(actual, expected)
})

test('parses x, y, width, height', function (t) {
  t.plan(1)
  const actual = crop('10,20,360,640')
  const expected = {
    x: 10,
    y: 20,
    width: 360,
    height: 640
  }
  t.looseEqual(actual, expected)
})
