#!/usr/bin/env node
/* eslint-disable no-console */

import * as nopt from 'nopt'

import { defaultFFmpegOptions } from './create-ffmpeg-options/default-ffmpeg-options'
import { FFmpegOptions } from './types'
import { vdx } from './vdx'

const packageJsonVersion = require('../package.json').version

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
  c: '--crop',
  cut: '--trim',
  d: '--debug',
  f: '--format',
  gif: '--format gif',
  h: '--help',
  mov: '--format mov',
  mp4: '--format mp4',
  na: '--no-audio',
  o: '--output',
  p: '--parallel',
  r: '--resize',
  ro: '--rotate',
  rv: '--reverse',
  s: '--speed',
  scale: '--resize',
  t: '--trim',
  v: '--version',
  vo: '--volume',
  x: '--fps'
}

async function main() {
  const { argv, debug, help, output, parallel, version, ...options } = nopt(
    knownOptions,
    shorthands
  )
  if (help) {
    console.log(usageMessage)
    process.exit(0)
  }
  if (version) {
    console.log(packageJsonVersion)
    process.exit(0)
  }
  const globPatterns = argv.remain
  if (globPatterns.length === 0) {
    console.error(`vdx: Need a glob pattern for input files`)
    process.exit(1)
  }
  const outputDirectory = typeof output === 'undefined' ? './build' : output
  const vdxOptions = { ...defaultFFmpegOptions, ...options } as FFmpegOptions
  try {
    await vdx(globPatterns, outputDirectory, vdxOptions, parallel, debug)
  } catch (error) {
    console.error(`vdx: ${error.message}`)
    process.exit(1)
  }
}

main()
