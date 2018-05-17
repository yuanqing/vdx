const test = require('tape')
const createFFmpegOptions = require('../create-ffmpeg-options')

test('is a function', function (t) {
  t.plan(1)
  t.true(typeof createFFmpegOptions === 'function')
})

test('parses the given options into `flags`, `audioFilters` and `videoFilters`', function (t) {
  t.plan(1)
  const options = {
    crop: {
      width: '360',
      height: '640'
    },
    format: 'mp4',
    fps: 12,
    resize: {
      width: '360',
      height: '-1'
    },
    reverse: true,
    speed: 2,
    trim: {
      start: '0:05',
      end: '0:10'
    },
    volume: 0.5
  }
  const actual = createFFmpegOptions(options)
  const expected = {
    flags: {
      'c:a': 'copy',
      r: 12,
      t: '00:00:05.000',
      ss: '00:00:05.000'
    },
    audioFilters: '"atempo=2,volume=0.5"',
    videoFilters:
      '"crop=360:640:undefined:undefined,scale=360:-1,reverse,setpts=(1/2)*PTS"'
  }
  t.looseEqual(actual, expected)
})
