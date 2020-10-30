import { test } from 'tap'

import { defaultOptions } from '../../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('default options', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', defaultOptions)
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
