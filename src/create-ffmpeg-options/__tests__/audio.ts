import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('strip audio', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
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
  t.equal(outputFile, 'build/video.mov')
})
