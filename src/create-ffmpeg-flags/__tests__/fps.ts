import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('fps', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    fps: 12
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['fps=fps=12'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})
