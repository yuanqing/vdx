import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('invalid', function (t) {
  t.plan(1)
  try {
    createFFmpegOptions('video.mov', 'build', {
      ...defaultFFmpegOptions,
      crop: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('width and height only', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    crop: '360,640'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['crop=360:640:0:0'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})

test('width, height, and coordinates', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    crop: '10,20,360,640'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['crop=360:640:10:20'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})
