import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('default options', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions(
    'video.mov',
    'build',
    defaultFFmpegOptions
  )
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
  t.equal(outputFile, 'build/video.mov')
})
