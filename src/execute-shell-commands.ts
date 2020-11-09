import * as childProcess from 'child_process'
import * as kleur from 'kleur'
import * as pAll from 'p-all'

import { escapeFilePath } from './escape-file-path'
import { FFmpegShellCommand } from './types'

export async function executeShellCommands(
  shellCommands: Array<FFmpegShellCommand>,
  parallel: number,
  debug: boolean
): Promise<void> {
  if (debug === true) {
    for (const { shellCommand } of shellCommands) {
      // eslint-disable-next-line no-console
      console.log(kleur.gray(shellCommand))
    }
  }
  const callbacks = shellCommands.map(function ({
    inputFile,
    outputFile,
    shellCommand
  }) {
    return function () {
      return new Promise(function (resolve, reject) {
        childProcess.exec(shellCommand, function (error) {
          if (error) {
            reject(error)
            return
          }
          // eslint-disable-next-line no-console
          console.log(
            `${kleur.green('✔')} ${escapeFilePath(inputFile)} ${kleur.gray(
              '›'
            )} ${escapeFilePath(outputFile)}`
          )
          resolve()
        })
      })
    }
  })
  await pAll(callbacks, { concurrency: parallel })
}
