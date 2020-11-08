const regex = /^(-1|\d+),(-1|\d+)$/

export function parseResizeValue(
  value: string
): {
  width: string
  height: string
} {
  if (value === '-1,-1') {
    throw new Error("Only one of <width> or <height> can be '-1'")
  }
  const matches = value.match(regex)
  if (matches === null) {
    throw new Error(`Expected ${name} to be <width>,<height>`)
  }
  return {
    height: matches[2],
    width: matches[1]
  }
}
