import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('0.5x volume', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    volume: 0.5
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': 'copy',
      'filter:a': ['volume=0.5'],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('2x volume', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    volume: 2
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': 'copy',
      'filter:a': ['volume=2.0'],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
