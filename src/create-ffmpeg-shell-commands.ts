import * as globby from 'globby'
import * as path from 'path'
import * as which from 'which'

import { createFFmpegFlags } from './create-ffmpeg-flags/create-ffmpeg-flags'
import { FFmpegFlags, FFmpegShellCommand, Options } from './types'

export async function createFFmpegShellCommands(
  globPatterns: Array<string>,
  outputDirectory: string,
  options: Options
): Promise<Array<FFmpegShellCommand>> {
  const ffmpegBinaryPath = await which('ffmpeg')
  const inputFiles = await globby(globPatterns)
  if (inputFiles.length === 0) {
    throw new Error('Cannot find input files')
  }
  const result = []
  for (const inputFile of inputFiles) {
    const outputFile = createOutputFilePath(
      inputFile,
      outputDirectory,
      options.format
    )
    const flags = createFFmpegFlags(inputFile, options)
    const shellCommand = createFFmpegShellCommand(
      ffmpegBinaryPath,
      flags,
      outputFile
    )
    result.push({
      inputFile,
      outputFile,
      shellCommand
    })
  }
  return result
}

function createOutputFilePath(
  inputFile: string,
  outputDirectory: string,
  format: null | string
): string {
  const directory = path.dirname(path.relative(process.cwd(), inputFile))
  if (format === null) {
    return path.join(outputDirectory, directory, path.basename(inputFile))
  }
  const basename = path.basename(inputFile, path.extname(inputFile))
  return path.join(outputDirectory, directory, `${basename}.${format}`)
}

function createFFmpegShellCommand(
  ffmpegBinaryPath: string,
  ffmpegFlags: FFmpegFlags,
  outputFile: string
): string {
  const result: Array<string> = []
  if (ffmpegFlags.ss !== null) {
    result.push(`-ss ${ffmpegFlags.ss}`)
  }
  if (ffmpegFlags.to !== null) {
    result.push(`-to ${ffmpegFlags.to}`)
  }
  // `-ss` and `-t` must come before the `-i` flag
  result.push(`-i '${ffmpegFlags.i}'`)
  if (ffmpegFlags.an === true) {
    result.push(`-an`)
  }
  if (ffmpegFlags['codec:a'] !== null) {
    result.push(`-codec:a ${ffmpegFlags['codec:a']}`)
  }
  if (ffmpegFlags['codec:v'] !== null) {
    result.push(`-codec:v ${ffmpegFlags['codec:v']}`)
  }
  if (ffmpegFlags['filter:a'] !== null && ffmpegFlags['filter:a'].length > 0) {
    result.push(
      `-filter:a '${ffmpegFlags['filter:a'].slice().sort().join(',')}'`
    )
  }
  if (ffmpegFlags['filter:v'] !== null && ffmpegFlags['filter:v'].length > 0) {
    result.push(
      `-filter:v '${ffmpegFlags['filter:v'].slice().sort().join(',')}'`
    )
  }
  return `${ffmpegBinaryPath} ${result.join(' ')} -y '${outputFile}'`
}
