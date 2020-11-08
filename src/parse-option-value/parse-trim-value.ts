const regex = /^\d{1,2}:[0-5]\d(?:.\d{1,3})?$/

export function parseTrimValue(
  value: string,
  name: string
): { startTimestamp: string; endTimestamp: null | string } {
  if (value.indexOf(',') === -1) {
    if (regex.test(value) === false) {
      throw new Error(
        `Expected ${name} to be a timestamp in the format HH:MM or HH:MM.mmm`
      )
    }
    return {
      endTimestamp: null,
      startTimestamp: value
    }
  }
  const split = value.split(',')
  if (regex.test(split[0]) === false) {
    throw new Error(
      `Expected ${name} start timestamp to be in the format HH:MM or HH:MM.mmm`
    )
  }
  if (regex.test(split[1]) === false) {
    throw new Error(
      `Expected ${name} end timestamp to be in the format HH:MM or HH:MM.mmm`
    )
  }
  return { endTimestamp: split[1], startTimestamp: split[0] }
}
