#!/usr/bin/env node
/* eslint-disable no-console */

import {
  BOOLEAN,
  createCli,
  NON_ZERO_POSITIVE_INTEGER,
  NON_ZERO_POSITIVE_NUMBER,
  POSITIVE_NUMBER,
  STRING
} from '@yuanqing/cli'

import { parseCropValue } from './parse-option-value/parse-crop-value'
import { parseResizeValue } from './parse-option-value/parse-resize-value'
import { parseTrimValue } from './parse-option-value/parse-trim-value'
import { Options } from './types'
import { vdx } from './vdx'

const packageJson = require('../package.json')

const cliConfig = {
  name: packageJson.name,
  version: packageJson.version
}

const commandConfig = {
  description: `${packageJson.description}.`,
  examples: [
    "'*.mov' --crop 360,640",
    "'*.mov' --format gif",
    "'*.mov' --fps 12",
    "'*.mov' --no-audio",
    "'*.mov' --resize 360,-1",
    "'*.mov' --reverse",
    "'*.mov' --rotate 90",
    "'*.mov' --speed 2",
    "'*.mov' --trim 0:05,0:10",
    "'*.mov' --volume 0.5"
  ],
  options: [
    {
      aliases: ['c'],
      default: null,
      description:
        'Crop the video to <width>,<height> or <x>,<y>,<width>,<height>.',
      name: 'crop',
      type: parseCropValue
    },
    {
      aliases: ['d'],
      default: false,
      description: 'Print the underlying FFmpeg commands that are being run.',
      name: 'debug',
      type: BOOLEAN
    },
    {
      aliases: ['f'],
      default: null,
      description: 'Convert the video to a different file format.',
      name: 'format',
      type: STRING
    },
    {
      aliases: ['fp'],
      default: null,
      description: 'Change the frame rate of the video.',
      name: 'fps',
      type: NON_ZERO_POSITIVE_INTEGER
    },
    {
      aliases: ['o'],
      default: 'build',
      description: "Set the output directory. Defaults to './build'.",
      name: 'output',
      type: STRING
    },
    {
      aliases: ['p'],
      default: 3,
      description:
        "Set the maximum number of video files to process concurrently. Defaults to '3'.",
      name: 'parallel',
      type: NON_ZERO_POSITIVE_INTEGER
    },
    {
      aliases: ['r'],
      default: null,
      description: 'Resize the video to <width>,<height>.',
      name: 'resize',
      type: parseResizeValue
    },
    {
      aliases: ['rv'],
      default: false,
      description: 'Reverse the video.',
      name: 'reverse',
      type: BOOLEAN
    },
    {
      aliases: ['ro'],
      default: null,
      description: "Rotate the video by '-90', '90', or '180' degrees.",
      name: 'rotate',
      type: ['-90', '90', '180']
    },
    {
      aliases: ['s'],
      default: null,
      description:
        'Change the speed of the video. To slow down, set to a number greater than 0 and less than 1. To speed up, set to a number greater than 1.',
      name: 'speed',
      type: NON_ZERO_POSITIVE_NUMBER
    },
    {
      aliases: ['t'],
      default: null,
      description:
        "Trim to <start>,<end> where <start> and <end> are timestamps in the format 'HH:MM' or 'HH:MM.mmm'. Omit <end> to trim from <start> to the end of the video.",
      name: 'trim',
      type: parseTrimValue
    },
    {
      aliases: ['vo'],
      default: null,
      description:
        'Change the volume of the video. To remove audio from the video, set to 0. To decrease the volume, set to a number greater than 0 and less than 1. To increase the volume, set to a number greater than 1.',
      name: 'volume',
      type: POSITIVE_NUMBER
    }
  ],
  positionals: [
    {
      description: 'Globs of input files to process.',
      name: 'files',
      required: true,
      type: STRING
    }
  ],
  shorthands: {
    'gif': ['--format', 'gif'],
    'mov': ['--format', 'mov'],
    'mp4': ['--format', 'mp4'],
    'no-audio': ['--volume', '0']
  }
}

async function main() {
  try {
    const result = createCli(cliConfig, commandConfig)(process.argv.slice(2))
    if (typeof result !== 'undefined') {
      const { positionals, options, remainder } = result
      const globPatterns = [positionals.files as string, ...remainder]
      await vdx(globPatterns, options as Options)
    }
  } catch (error) {
    console.error(`vdx: ${error.message}`)
    process.exit(1)
  }
}
main()
