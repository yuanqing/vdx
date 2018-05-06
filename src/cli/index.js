#!/usr/bin/env node

const nopt = require('nopt')
const vdx = require('..')
const logger = require('./logger')
const transformOptions = require('./transform-options')
const packageVersion = require('../../package.json').version

const usageMessage = `
Usage: vdx [input] [options]

Input:

Options:
  -c, --crop <options>  Crop the input file. <options> is one of
                        <x>,<y>,<width>,<height> or <width>,<height>.
  -f, --format <format>  Set the format of the output files.
  -x  --fps <fps>  Set the frame rate.
  -g, --gif  Shorthand for \`--format gif\`
  -h, --help  Print this message.
  -n, --no-audio  Remove audio from the input file.
  -o, --output <directory>  Set the output directory. Defaults
                            to 'build'.
  -p, --parallel <concurrency>  Set the maximum number of files to
                                process at any one time.
  -r, --resize <options>  Resize the input file. <options> is
                          specified as <width>,<height>.
  -s, --speed <speed>  Set the speed of the input file. To slow down
                       the video, set <speed> to a number between 0
                       and 1. To speed up the video, set <speed> to a
                       number greater than 1.
  -t, --trim <options>  Trim the input file to a specific duration.
                        <options> is either <start>,<end> or <end>.
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
  speed: Number,
  trim: String,
  version: Boolean
}
const shorthands = {
  f: '--format',
  g: '--format gif',
  gif: '--format gif',
  n: '--no-audio',
  x: '--fps'
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
