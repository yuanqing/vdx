import { test } from 'tap'

import { createFFmpegFlags } from '../create-ffmpeg-flags'
import { defaultOptions } from '../default-options'

test('strip audio', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    volume: 0
  })
  t.deepEqual(flags, {
    'an': true,
    'codec:a': null,
    'codec:v': 'copy',
    'filter:a': [],
    'filter:v': [],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})

test('halve the volume', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    volume: 0.5
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': null,
    'codec:v': 'copy',
    'filter:a': ['volume=0.5'],
    'filter:v': [],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})

test('double the volume', function (t) {
  t.plan(1)
  const flags = createFFmpegFlags('video.mov', {
    ...defaultOptions,
    volume: 2
  })
  t.deepEqual(flags, {
    'an': null,
    'codec:a': null,
    'codec:v': 'copy',
    'filter:a': ['volume=2.0'],
    'filter:v': [],
    'i': 'video.mov',
    'ss': null,
    'to': null
  })
})
