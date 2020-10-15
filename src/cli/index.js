#!/usr/bin/env node

const nopt = require('nopt')

const log = require('../log')
const packageVersion = require('../../package.json').version
const transformOptions = require('./transform-options')
const vdx = require('../vdx')

const usageMessage = `
Usage: vdx <pattern> [options]

Pattern:
  Globs of input files to process.

Options:
  -c,  --crop [<x>,<y>,]<width>,<height>  Crop the video. <x> and
                                          <y> both default to 0.
  -d,  --debug  Verbose output for debugging.
  -f,  --format <format>  Set the format of the output files.
       --gif  Shorthand for '--format gif'.
       --mov  Shorthand for '--format mov'.
       --mp4  Shorthand for '--format mp4'.
  -fp, --fps <fps>  Set the frame rate.
  -h,  --help  Print this message.
  -na, --no-audio  Strip the audio.
  -o,  --output <directory>  Set the output directory. Defaults
                             to './build'.
  -p,  --parallel <concurrency>  Set the maximum number of files
                                 to process concurrently. Defaults
                                 to 3.
  -r,  --resize <width>,<height>  Resize the video.
  -ro, --rotate <angle>  Rotate the video. <angle> is one of
                         -90, 90, or 180.
  -rv, --reverse  Reverse the video.
  -s,  --speed <speed>  Set the speed. To slow down, set <speed> to
                        a number between 0 and 1. To speed up, set
                        <speed> to a number greater than 1.
  -t,  --trim <start>[,<end>]  Trim to the specified duration.
  -v,  --version  Print the version number.
  -vo, --volume  Set the volume.
`

const knownOptions = {
  audio: Boolean,
  crop: String,
  debug: Boolean,
  format: String,
  fps: Number,
  help: Boolean,
  output: String,
  parallel: Number,
  resize: String,
  reverse: Boolean,
  rotate: String,
  speed: Number,
  trim: String,
  version: Boolean,
  volume: Number
}
const shorthands = {
  a: '--audio',
  na: '--no-audio',
  c: '--crop',
  d: '--debug',
  f: '--format',
  gif: '--format gif',
  mov: '--format mov',
  mp4: '--format mp4',
  x: '--fps',
  h: '--help',
  o: '--output',
  p: '--parallel',
  r: '--resize',
  scale: '--resize',
  ro: '--rotate',
  rv: '--reverse',
  s: '--speed',
  t: '--trim',
  cut: '--trim',
  v: '--version',
  vo: '--volume'
}

async function main () {
  const { argv, help, output, version, ...rest } = nopt(
    knownOptions,
    shorthands
  )

  const globPatterns = argv.remain
  if (globPatterns.length === 0) {
    log.error('Need a glob pattern for input files')
    process.exit(0)
  }

  const options = transformOptions(rest)

  if (help) {
    console.log(usageMessage)
    process.exit(0)
  }

  if (version) {
    console.log(packageVersion)
    process.exit(0)
  }

  const run = await vdx(options)
  await run(globPatterns, output)
}

main()
