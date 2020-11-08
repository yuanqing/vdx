import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('crop to the specified width and height, starting from coordinates (x, y)', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    crop: {
      height: '640',
      width: '360',
      x: '10',
      y: '20'
    }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': null,
    'filter:a': [],
    'filter:v': ['crop=360:640:10:20'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
