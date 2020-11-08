import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('no-op', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    format: 'mov'
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': 'copy',
    'filter:a': [],
    'filter:v': [],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})

test('convert to GIF', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    format: 'gif'
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': null,
    'codec:v': null,
    'filter:a': [],
    'filter:v': [],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
