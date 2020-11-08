import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('change the frame rate', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    fps: 12
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': null,
    'filter:a': [],
    'filter:v': ['fps=fps=12'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
