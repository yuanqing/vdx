export function mapRotateOptionToVideoFilter(rotate: string): string {
  if (rotate === '-90') {
    return 'transpose=2'
  }
  if (rotate === '90') {
    return 'transpose=1'
  }
  if (rotate === '180') {
    return 'transpose=1,transpose=1'
  }
  throw new Error('Expected --rotate to be one of -90, 90, or 180')
}
