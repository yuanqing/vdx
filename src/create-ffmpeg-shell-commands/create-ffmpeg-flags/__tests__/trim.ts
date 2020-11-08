import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('trim from the start timestamp to the end of the input file', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    trim: { endTimestamp: null, startTimestamp: '0:05' }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': 'copy',
    'filter:a': [],
    'filter:v': [],
    'i': 'video.mov',
    'ss': '0:05',
    'to': null
  })
})

test('trim from the start timestamp to the end timestamp', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    trim: { endTimestamp: '0:10', startTimestamp: '0:05' }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': 'copy',
    'filter:a': [],
    'filter:v': [],
    'i': 'video.mov',
    'ss': '0:05',
    'to': '0:10'
  })
})
