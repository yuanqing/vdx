import { formatFloat } from './format-float'

export function mapSpeedOptionToVideoFilter(speed: number): string {
  return `setpts=${formatFloat(1 / speed)}*PTS`
}
