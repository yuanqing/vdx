const regex = /^(\d+),(\d+)(?:,(\d+),(\d+))?$/

export function parseCropValue(
  value: string
): {
  width: string
  height: string
  x: string
  y: string
} {
  const matches = value.match(regex)
  if (matches === null) {
    throw new Error(
      `Expected ${name} to be either <width>,<height> or <x>,<y>,<width>,<height>`
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
    throw new Error(`<width> in ${name} must be greater than '0'`)
  }
  if (height === '0') {
    throw new Error(`<height> in ${name} must be greater than '0'`)
  }
  return {
    height,
    width,
    x,
    y
  }
}
