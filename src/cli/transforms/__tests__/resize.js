const test = require('tape')
const resize = require('../resize')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof resize === 'function')
})

test('throws for unexpected formats', function (t) {
  const unexpectedFormats = ['', 'foo', '360,', '360,-2']
  t.plan(unexpectedFormats.length)
  unexpectedFormats.forEach(function (unexpectedFormat) {
    t.throws(function () {
      resize(unexpectedFormat)
    })
  })
})

test('parses width only', function (t) {
  t.plan(1)
  const actual = resize('360')
  const expected = {
    width: '360',
    height: '-2'
  }
  t.looseEqual(actual, expected)
})

test('parses width and height', function (t) {
  t.plan(1)
  const actual = resize('360,640')
  const expected = {
    width: '360',
    height: '640'
  }
  t.looseEqual(actual, expected)
})

test('parses negative width', function (t) {
  t.plan(1)
  const actual = resize('-1,640')
  const expected = {
    width: '-2',
    height: '640'
  }
  t.looseEqual(actual, expected)
})

test('parses negative height', function (t) {
  t.plan(1)
  const actual = resize('360,-1')
  const expected = {
    width: '360',
    height: '-2'
  }
  t.looseEqual(actual, expected)
})
