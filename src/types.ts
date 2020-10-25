export type FFmpegOptions = {
  crop: null | string
  format: null | string
  fps: null | number
  audio: boolean
  resize: null | string
  reverse: boolean
  rotate: null | string
  speed: null | number
  trim: null | string
  volume: null | number
}

export type FFmpegCliFlags = {
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
