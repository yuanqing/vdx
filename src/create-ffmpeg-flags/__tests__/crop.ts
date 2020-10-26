import { test } from 'tap'

import { defaultOptions } from '../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('invalid', function (t) {
  t.plan(1)
  try {
    createFFmpegFlags('video.mov', {
      ...defaultOptions,
      crop: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('width and height only', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
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
})

test('width, height, and coordinates', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
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
})
