import { TrimOption } from '../types'

const regex = /^\d{1,2}:[0-5]\d(?:.\d{1,3})?$/

export function parseTrimValue(value: string, name: string): TrimOption {
  if (value.indexOf(',') === -1) {
    if (regex.test(value) === false) {
      throw new Error(
        `${name}'s start timestamp must be in the format 'HH:MM' or 'HH:MM.mmm'`
      )
    }
    return {
      endTimestamp: null,
      startTimestamp: value
    }
  }
  const split = value.split(',')
  if (split.length !== 2 || split[0] === '') {
    throw new Error(
      `${name} must be <start>,<end> where <start> and <end> are timestamps in the format 'HH:MM' or 'HH:MM.mmm'`
    )
  }
  if (regex.test(split[0]) === false) {
    throw new Error(
      `${name}'s start timestamp must be in the format 'HH:MM' or 'HH:MM.mmm'`
    )
  }
  if (split[1] === '') {
    return { endTimestamp: null, startTimestamp: split[0] }
  }
  if (regex.test(split[1]) === false) {
    throw new Error(
      `${name}'s end timestamp must be in the format 'HH:MM' or 'HH:MM.mmm'`
    )
  }
  return { endTimestamp: split[1], startTimestamp: split[0] }
}
