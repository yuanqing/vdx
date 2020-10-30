const regex = /^(\d+),(\d+)(?:,(\d+),(\d+))?$/

export function mapCropOptionToVideoFilter(crop: string): string {
  const matches = crop.match(regex)
  if (matches === null) {
    throw new Error(
      'Expected --crop to be <width>,<height> or <x>,<y>,<width>,<height>'
    )
  }
  if (typeof matches[3] === 'undefined') {
    return `crop=${matches[1]}:${matches[2]}:0:0`
  }
  return `crop=${matches[3]}:${matches[4]}:${matches[1]}:${matches[2]}`
}
