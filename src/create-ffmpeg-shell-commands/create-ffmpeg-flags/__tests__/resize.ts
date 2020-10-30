import { test } from 'tap'

import { defaultOptions } from '../../../default-options'
import { createFFmpegFlags } from '../create-ffmpeg-flags'

test('invalid', function (t) {
  t.plan(1)
  try {
    createFFmpegFlags('video.mov', {
      ...defaultOptions,
      resize: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('width only', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    resize: '360,-1'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['scale=360:-1'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('height only', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    resize: '-1,640'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': null,
      'filter:a': [],
      'filter:v': ['scale=-1:640'],
      'i': 'video.mov',
      'ss': null,
      'to': null
    },
    flags
  )
})

test('width and height', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
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
})
