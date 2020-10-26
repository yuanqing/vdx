import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('invalid timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegFlags('video.mov', {
      ...defaultOptions,
      trim: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('start timestamp only', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    trim: '0:05'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': 'copy',
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': '0:05',
      'to': null
    },
    flags
  )
})

test('invalid start timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegFlags('video.mov', {
      ...defaultOptions,
      trim: 'foo,0:10'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('invalid end timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegFlags('video.mov', {
      ...defaultOptions,
      trim: '0:05,foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('start and end timestamp', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    trim: '0:05,0:10'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': 'copy',
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': '0:05',
      'to': '0:10'
    },
    flags
  )
})
