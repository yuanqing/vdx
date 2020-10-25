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
  const callbacks = shellCommands.map(function ({
    inputFile,
    outputFile,
    shellCommand
  }) {
    return function () {
      return new Promise(function (resolve, reject) {
        if (debug === true) {
          console.log(kleur.gray(shellCommand))
        }
        childProcess.exec(shellCommand, function (error) {
          if (error) {
            reject(error)
            return
          }
          console.log(
            `${kleur.green('✔')} ${inputFile} ${kleur.gray('›')} ${outputFile}`
          )
          resolve()
        })
      })
    }
  })
  await pAll(callbacks, { concurrency })
}
