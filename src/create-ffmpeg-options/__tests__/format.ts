import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('convert to same format as input file', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    format: 'mov'
  })
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

test('convert to GIF format', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    format: 'gif'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': null,
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.gif')
})
