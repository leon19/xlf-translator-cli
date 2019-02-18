import path from 'path'

/**
 * Extract the locale from a file with the forma  `messages.[locale].xlf`
 */
export default function localeFromFile(file: string): string {
  const name = path.basename(file) || ''

  const match = name.match(/^messages\.(.+?)\.xlf/)

  if (!match) {
    throw new Error(`${file} is not a translation file`)
  }

  return match[1]
}
