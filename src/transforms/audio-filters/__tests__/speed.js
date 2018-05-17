const test = require('tape')
const speed = require('../speed')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof speed === 'function')
})

test('returns `undefined` if called without arguments', function (t) {
  t.plan(1)
  t.true(typeof speed() === 'undefined')
})

test('parses 0.2x speed', function (t) {
  t.plan(1)
  const actual = speed(0.2)
  const expected = 'atempo=0.5,atempo=0.5,atempo=0.8'
  t.looseEqual(actual, expected)
})

test('parses 0.5x speed', function (t) {
  t.plan(1)
  const actual = speed(0.5)
  const expected = 'atempo=0.5'
  t.looseEqual(actual, expected)
})

test('parses 1x speed', function (t) {
  t.plan(1)
  const actual = speed(1)
  const expected = null
  t.looseEqual(actual, expected)
})

test('parses 2x speed', function (t) {
  t.plan(1)
  const actual = speed(2)
  const expected = 'atempo=2'
  t.looseEqual(actual, expected)
})

test('parses 5x speed', function (t) {
  t.plan(1)
  const actual = speed(5)
  const expected = 'atempo=2,atempo=2,atempo=1.25'
  t.looseEqual(actual, expected)
})
