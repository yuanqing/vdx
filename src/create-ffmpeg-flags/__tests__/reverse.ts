import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('reverse', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    reverse: true
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': ['areverse'],
      'filter:v': ['reverse'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
