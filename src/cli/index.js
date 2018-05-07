#!/usr/bin/env node

const nopt = require('nopt')
const vdx = require('..')
const logger = require('./logger')
const transformOptions = require('./transform-options')
const packageVersion = require('../../package.json').version

const usageMessage = `
Usage: vdx [input] [options]

Input:
  Globs of input files to process. Read from stdin if not specified.

Options:
  -c, --crop [<x>,<y>,]<width>,<height>  Crop the input files. <x>
                                         and <y> both default to 0.
  -f, --format <format>  Set the format of the output files.
      --gif  Shorthand for '--format gif'.
      --mov  Shorthand for '--format mov'.
      --mp4  Shorthand for '--format mp4'.
  -x  --fps <fps>  Set the frame rate.
  -h, --help  Print this message.
  -n, --no-audio  Strip audio from the input files.
  -o, --output <directory>  Set the output directory. Defaults
                            to './build'.
  -p, --parallel <concurrency>  Set the maximum number of files to
                                process concurrently. Defaults to 3.
  -r, --resize <width>,<height>  Resize the input files.
  -e, --reverse  Reverse the input files.
  -s, --speed <speed>  Set the speed of the input files. To slow down
                       the video, set <speed> to a number between 0
                       and 1. To speed up the video, set <speed> to a
                       number greater than 1.
  -t, --trim <start>[,<end>]  Trim the input files to the
                              specified duration.
  -v, --version  Print the version number.
`

const knownOptions = {
  audio: Boolean,
  crop: String,
  format: String,
  fps: Number,
  help: Boolean,
  output: String,
  parallel: Number,
  resize: String,
  reverse: Boolean,
  speed: Number,
  trim: String,
  version: Boolean
}
const shorthands = {
  f: '--format',
  gif: '--format gif',
  mov: '--format mov',
  mp4: '--format mp4',
  x: '--fps',
  n: '--no-audio',
  e: '--reverse'
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

  const run = await vdx(options, logger)
  await run(input, output || 'build')
}

main()
