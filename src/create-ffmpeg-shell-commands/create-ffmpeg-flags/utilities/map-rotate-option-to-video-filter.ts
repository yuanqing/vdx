import { RotateOption } from '../../../types'

export function mapRotateOptionToVideoFilter(rotate: RotateOption): string {
  if (rotate === '-90') {
    return 'transpose=2'
  }
  if (rotate === '90') {
    return 'transpose=1'
  }
  return 'transpose=1,transpose=1'
}
