import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('strip audio', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    audio: false
  })
  t.deepEqual(
    {
      'an': true,
      'codec:a': null,
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
