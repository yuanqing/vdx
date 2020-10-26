import { createFFmpegShellCommands } from './create-ffmpeg-shell-commands'
import { executeShellCommands } from './execute-shell-commands'
import { Options } from './types'

export async function vdx(
  globPatterns: Array<string>,
  outputDirectory: string,
  options: Options,
  concurrency: number,
  debug: boolean
): Promise<void> {
  const shellCommands = await createFFmpegShellCommands(
    globPatterns,
    outputDirectory,
    options
  )
  if (shellCommands.length === 0) {
    return
  }
  await executeShellCommands(shellCommands, concurrency, debug)
}
