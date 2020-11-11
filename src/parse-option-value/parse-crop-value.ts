import { CropOption } from '../types'

const regex = /^(\d+),(\d+)(?:,(\d+),(\d+))?$/

export function parseCropValue(value: string): CropOption {
  const matches = value.match(regex)
  if (matches === null) {
    throw new Error(
      `${name} must be either <width>,<height> or <x>,<y>,<width>,<height>`
    )
  }
  let x, y, width, height
  if (typeof matches[3] === 'undefined') {
    x = '0'
    y = '0'
    width = matches[1]
    height = matches[2]
  } else {
    x = matches[1]
    y = matches[2]
    width = matches[3]
    height = matches[4]
  }
  if (width === '0') {
    throw new Error(`${name}'s <width> must be greater than '0'`)
  }
  if (height === '0') {
    throw new Error(`${name}'s <height> must be greater than '0'`)
  }
  return {
    height,
    width,
    x,
    y
  }
}
