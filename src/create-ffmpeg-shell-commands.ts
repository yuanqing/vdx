import * as globby from 'globby'
import * as which from 'which'

import { createFFmpegOptions } from './create-ffmpeg-options/create-ffmpeg-options'
import { FFmpegCliFlags, FFmpegOptions, FFmpegShellCommand } from './types'

export async function createFFmpegShellCommands(
  globPatterns: Array<string>,
  outputDirectory: string,
  vdxOptions: FFmpegOptions
): Promise<Array<FFmpegShellCommand>> {
  const ffmpegBinaryPath = await which('ffmpeg')
  const inputFiles = await globby(globPatterns)
  if (inputFiles.length === 0) {
    throw new Error('Cannot find input files')
  }
  const result = []
  for (const inputFile of inputFiles) {
    const { flags, outputFile } = createFFmpegOptions(
      inputFile,
      outputDirectory,
      vdxOptions
    )
    result.push({
      inputFile,
      outputFile,
      shellCommand: createFFmpegShellCommand(
        ffmpegBinaryPath,
        flags,
        outputFile
      )
    })
  }
  return result
}

function createFFmpegShellCommand(
  ffmpegBinaryPath: string,
  ffmpegFlags: FFmpegCliFlags,
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
