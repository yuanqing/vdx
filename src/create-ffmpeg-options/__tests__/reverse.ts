import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('reverse', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
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
  t.equal(outputFile, 'build/video.mov')
})
