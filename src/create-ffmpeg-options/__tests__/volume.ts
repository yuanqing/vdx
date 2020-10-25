import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('0.5x volume', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    volume: 0.5
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': 'copy',
      'filter:a': ['volume=0.5'],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})

test('2x volume', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    volume: 2
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': null,
      'codec:v': 'copy',
      'filter:a': ['volume=2.0'],
      'filter:v': [],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})
