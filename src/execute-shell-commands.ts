/* eslint-disable no-console */

import * as childProcess from 'child_process'
import * as kleur from 'kleur'
import * as pAll from 'p-all'

import { FFmpegShellCommand } from './types'

export async function executeShellCommands(
  shellCommands: Array<FFmpegShellCommand>,
  concurrency: number,
  debug: boolean
): Promise<void> {
  if (debug === true) {
    for (const { shellCommand } of shellCommands) {
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
          console.log(
            `${kleur.green('✔')} ${formatFilePath(inputFile)} ${kleur.gray(
              '›'
            )} ${formatFilePath(outputFile)}`
          )
          resolve()
        })
      })
    }
  })
  await pAll(callbacks, { concurrency })
}

function formatFilePath(filePath: string): string {
  if (filePath.indexOf(' ') === -1) {
    return filePath
  }
  return `'${filePath}'`
}
