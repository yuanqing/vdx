export type Options = {
  crop: null | { height: string; width: string; x: string; y: string }
  debug: boolean
  format: null | string
  fps: null | number
  output: string
  parallel: number
  resize: null | { height: string; width: string }
  reverse: boolean
  rotate: null | RotateOption
  speed: null | number
  trim: null | { endTimestamp: null | string; startTimestamp: string }
  volume: null | number
}

export type RotateOption = '-90' | '90' | '180'

export type FFmpegFlags = {
  'an': null | boolean
  'codec:a': null | 'copy'
  'codec:v': null | 'copy'
  'filter:a': Array<string>
  'filter:v': Array<string>
  'i': string
  'ss': null | string
  'to': null | string
}

export type FFmpegShellCommand = {
  inputFile: string
  outputFile: string
  shellCommand: string
}
