import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('reverse the video', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    reverse: true
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': null,
    'codec:v': null,
    'filter:a': ['areverse'],
    'filter:v': ['reverse'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
