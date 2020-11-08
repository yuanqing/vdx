import { createFFmpegShellCommands } from './create-ffmpeg-shell-commands/create-ffmpeg-shell-commands'
import { executeShellCommands } from './execute-shell-commands'
import { Options } from './types'

export async function vdx(
  globPatterns: Array<string>,
  options: Options
): Promise<void> {
  const { debug, parallel, output, ...rest } = options
  const shellCommands = await createFFmpegShellCommands(
    globPatterns,
    output,
    rest
  )
  if (shellCommands.length === 0) {
    return
  }
  await executeShellCommands(shellCommands, parallel, debug)
}
