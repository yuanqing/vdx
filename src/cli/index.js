#!/usr/bin/env node

const nopt = require('nopt')
const vdx = require('..')
const transformOptions = require('./transform-options')
const packageVersion = require('../../package.json').version

const usageMessage = `
Usage: vdx [input] [options]

Input:
  Globs of input files to process. Read from stdin if not specified.

Options:
  -c,  --crop [<x>,<y>,]<width>,<height>  Crop the input files. <x>
                                         and <y> both default to 0.
  -d,  --debug  Verbose output for debugging or development.
  -f,  --format <format>  Set the format of the output files.
       --gif  Shorthand for '--format gif'.
       --mov  Shorthand for '--format mov'.
       --mp4  Shorthand for '--format mp4'.
  -fp, --fps <fps>  Set the frame rate.
  -h,  --help  Print this message.
  -na, --no-audio  Strip audio from the input files.
  -o,  --output <directory>  Set the output directory. Defaults
                            to './build'.
  -p,  --parallel <concurrency>  Set the maximum number of files to
                                process concurrently. Defaults to 3.
  -r,  --resize <width>,<height>  Resize the input files.
  -rv, --reverse  Reverse the input files.
  -s,  --speed <speed>  Set the speed of the input files. To slow down
                       the video, set <speed> to a number between 0
                       and 1. To speed up the video, set <speed> to a
                       number greater than 1.
  -t,  --trim <start>[,<end>]  Trim the input files to the
                              specified duration.
  -v,  --version  Print the version number.
  -vo, --volume  Set the volume of the input files.
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
  rv: '--reverse',
  ro: '--rotate',
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

  const input = argv.remain
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
  await run(input, output || 'build')
}

main()
