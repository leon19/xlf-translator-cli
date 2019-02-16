import path from 'path'

export default function isBaseMessageFile(file: string) {
  return path.basename(file) === 'messages.xlf'
}
