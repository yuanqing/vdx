import { formatFloat } from './format-float'

export function mapSpeedOptionToAudioFilter(speed: number): string {
  const split = splitSpeed(speed)
  return split
    .map(function (value) {
      return `atempo=${formatFloat(value)}`
    })
    .join(',')
}

function splitSpeed(speed: number): Array<number> {
  const result: Array<number> = []
  if (speed > 2) {
    while (speed > 2) {
      speed = speed / 2
      result.push(2)
    }
    result.push(speed)
    return result
  }
  while (speed < 0.5) {
    speed = speed / 0.5
    result.push(0.5)
  }
  result.push(speed)
  return result
}
