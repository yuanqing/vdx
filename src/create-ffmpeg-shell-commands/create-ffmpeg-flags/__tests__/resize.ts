import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('resize to the specified width, retaining aspect ratio', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    resize: {
      height: '-1',
      width: '360'
    }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': null,
    'filter:a': [],
    'filter:v': ['scale=360:-1'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})

test('resize to the specified height, retaining aspect ratio', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    resize: {
      height: '640',
      width: '-1'
    }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': null,
    'filter:a': [],
    'filter:v': ['scale=-1:640'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})

test('resize to the specified width and height', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    resize: {
      height: '640',
      width: '360'
    }
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': 'copy',
    'codec:v': null,
    'filter:a': [],
    'filter:v': ['scale=360:640'],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
