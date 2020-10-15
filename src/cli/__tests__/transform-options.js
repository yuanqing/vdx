const test = require('tape')
const transformOptions = require('../transform-options')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof transformOptions === 'function')
})

test('transforms the `crop`, `resize`, `rotate`, and `trim` keys', function (t) {
  t.plan(1)
  const options = {
    crop: '360,640',
    resize: '360,-1',
    rotate: '180',
    trim: '0:05,0:10'
  }
  const actual = transformOptions(options)
  const expected = {
    crop: { x: '0', y: '0', width: '360', height: '640' },
    resize: { width: '360', height: '-2' },
    rotate: { angle: '180' },
    trim: { start: '0:05', end: '0:10' }
  }
  t.deepEqual(actual, expected)
})

test('leaves all other keys untouched', function (t) {
  t.plan(1)
  const options = {
    foo: 42
  }
  const actual = transformOptions(options)
  const expected = {
    foo: 42
  }
  t.deepEqual(actual, expected)
})
