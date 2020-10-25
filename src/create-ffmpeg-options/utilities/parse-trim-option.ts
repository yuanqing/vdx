const regex = /\d{1,2}:[0-5]\d(?:.\d{1,3})?/

export function parseTrimOption(
  trim: string
): { startTimestamp: string; endTimestamp: null | string } {
  if (trim.indexOf(',') === -1) {
    if (regex.test(trim) === false) {
      throw new Error(
        'Expected --trim to be a timestamp in the format HH:MM or HH:MM.mmm'
      )
    }
    return {
      endTimestamp: null,
      startTimestamp: trim
    }
  }
  const split = trim.split(',')
  if (regex.test(split[0]) === false) {
    throw new Error(
      'Expected --trim start timestamp to be in the format HH:MM or HH:MM.mmm'
    )
  }
  if (regex.test(split[1]) === false) {
    throw new Error(
      'Expected --trim end timestamp to be in the format HH:MM or HH:MM.mmm'
    )
  }
  return { endTimestamp: split[1], startTimestamp: split[0] }
}
