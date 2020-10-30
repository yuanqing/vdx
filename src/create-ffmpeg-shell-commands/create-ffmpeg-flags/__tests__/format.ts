import { test } from 'tap'

import { defaultOptions } from '../../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('convert to same format as input file', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    format: 'mov'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': 'copy',
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('convert to GIF format', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    format: 'gif'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
