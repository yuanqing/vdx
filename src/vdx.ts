import * as fs from 'fs'

import { createFFmpegShellCommands } from './create-ffmpeg-shell-commands'
import { executeShellCommands } from './execute-shell-commands'
import { FFmpegOptions } from './types'

export async function vdx(
  globPatterns: Array<string>,
  outputDirectory: string,
  ffmpegOptions: FFmpegOptions,
  concurrency: number,
  debug: boolean
): Promise<void> {
  const shellCommands = await createFFmpegShellCommands(
    globPatterns,
    outputDirectory,
    ffmpegOptions
  )
  if (shellCommands.length === 0) {
    return
  }
  fs.mkdirSync(outputDirectory, { recursive: true })
  await executeShellCommands(shellCommands, concurrency, debug)
}
