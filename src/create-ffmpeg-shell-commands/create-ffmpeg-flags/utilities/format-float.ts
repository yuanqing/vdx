const dotZeroSuffixRegex = /\.0+$/
const zeroSuffixRegex = /0+$/

export function formatFloat(value: number): string {
  const formatted = value.toFixed(6)
  if (dotZeroSuffixRegex.test(formatted) === true) {
    return value.toFixed(1)
  }
  return formatted.replace(zeroSuffixRegex, '')
}
