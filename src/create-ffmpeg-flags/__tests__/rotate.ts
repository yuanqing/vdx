import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('90 degrees counter-clockwise', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    rotate: '-90'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['transpose=2'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('90 degrees clockwise', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    rotate: '90'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['transpose=1'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('180 degrees', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    rotate: '180'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['transpose=1,transpose=1'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
