import { test } from 'tap'

import { defaultOptions } from '../../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('0.25x speed', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    speed: 0.25
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': ['atempo=0.5,atempo=0.5'],
      'filter:v': ['setpts=4.0*PTS'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('0.5x speed', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    speed: 0.5
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': ['atempo=0.5'],
      'filter:v': ['setpts=2.0*PTS'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('2x speed', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    speed: 2
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': ['atempo=2.0'],
      'filter:v': ['setpts=0.5*PTS'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('4x speed', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    speed: 4
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': ['atempo=2.0,atempo=2.0'],
      'filter:v': ['setpts=0.25*PTS'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
