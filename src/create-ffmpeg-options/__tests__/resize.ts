import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('invalid', function (t) {
  t.plan(1)
  try {
    createFFmpegOptions('video.mov', 'build', {
      ...defaultFFmpegOptions,
      resize: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('width and height', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    resize: '360,640'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['scale=360:640'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})
