const specialCharactersRegex = /["' ]/
const quoteRegex = /"/g

export function escapeFilePath(filePath: string): string {
  if (specialCharactersRegex.test(filePath) === false) {
    return filePath
  }
  const result = filePath.replace(quoteRegex, function () {
    return '\\"'
  })
  return `"${result}"`
}
