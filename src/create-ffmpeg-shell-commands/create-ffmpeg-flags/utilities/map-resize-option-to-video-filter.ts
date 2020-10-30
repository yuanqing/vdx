const regex = /^(-1|\d+),(-1|\d+)$/

export function mapResizeOptionToVideoFilter(resize: string): string {
  const matches = resize.match(regex)
  if (matches === null) {
    throw new Error('Expected --resize to be <width>,<height>')
  }
  return `scale=${matches[1]}:${matches[2]}`
}
