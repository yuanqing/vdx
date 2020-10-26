export function formatFloat(value: number): string {
  const formatted = value.toFixed(6)
  if (/\.0+$/.test(formatted)) {
    return value.toFixed(1)
  }
  return formatted.replace(/0+$/, '')
}
