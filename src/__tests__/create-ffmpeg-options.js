const test = require('tape')
const createFFmpegOptions = require('../create-ffmpeg-options')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof createFFmpegOptions === 'function')
})

test('takes basic options', function (t) {
  t.plan(1)
  const options = {
    audio: false
  }
  const actual = createFFmpegOptions(options)
  const expected = {
    audioFilters: null,
    flags: {
      c: 'copy',
      an: true
    },
    videoFilters: null
  }
  t.looseEqual(actual, expected)
})

test('takes complex options', function (t) {
  t.plan(1)
  const options = {
    format: 'gif',
    fps: 12,
    resize: {
      width: '360',
      height: '-1'
    },
    speed: 2,
    trim: {
      start: '0:05',
      end: '0:10'
    }
  }
  const actual = createFFmpegOptions(options)
  const expected = {
    audioFilters: '"atempo=2"',
    flags: {
      'c:a': 'copy',
      r: 12,
      t: '00:00:05.000',
      ss: '00:00:05.000'
    },
    videoFilters:
      '"[0:v] split [v1][v2];[v1] palettegen [palette];[v2][palette] paletteuse,scale=360:-1,setpts=(1/2)*PTS"'
  }
  t.looseEqual(actual, expected)
})
