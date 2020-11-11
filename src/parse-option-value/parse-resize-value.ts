import { ResizeOption } from '../types'

const regex = /^(-1|\d+),(-1|\d+)$/

export function parseResizeValue(value: string): ResizeOption {
  if (value === '-1,-1') {
    throw new Error("Only one of <width> or <height> can be '-1'")
  }
  const matches = value.match(regex)
  if (matches === null) {
    throw new Error(`${name} must be <width>,<height>`)
  }
  return {
    height: matches[2],
    width: matches[1]
  }
}
