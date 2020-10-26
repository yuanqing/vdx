import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('fps', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
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
  t.equal(outputFile, 'build/video.mov')
})
