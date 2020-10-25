import { test } from 'tap'

import { createFFmpegOptions } from '../create-ffmpeg-options'
import { defaultFFmpegOptions } from '../default-ffmpeg-options'

test('invalid timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegOptions('video.mov', 'build', {
      ...defaultFFmpegOptions,
      trim: 'foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('start timestamp only', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    trim: '00:05'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': 'copy',
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': '00:05',
      'to': null
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})

test('invalid start timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegOptions('video.mov', 'build', {
      ...defaultFFmpegOptions,
      trim: 'foo,00:10'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('invalid end timestamp', function (t) {
  t.plan(1)
  try {
    createFFmpegOptions('video.mov', 'build', {
      ...defaultFFmpegOptions,
      trim: '00:05,foo'
    })
    t.fail()
  } catch {
    t.pass()
  }
})

test('start and end timestamp', function (t) {
  t.plan(2)
  const { flags, outputFile } = createFFmpegOptions('video.mov', 'build', {
    ...defaultFFmpegOptions,
    trim: '00:05,00:10'
  })
  t.deepEqual(
    {
      'an': null,
      'codec:a': 'copy',
      'codec:v': 'copy',
      'filter:a': [],
      'filter:v': [],
      'i': 'video.mov',
      'ss': '00:05',
      'to': '00:10'
    },
    flags
  )
  t.equal(outputFile, 'build/video.mov')
})
