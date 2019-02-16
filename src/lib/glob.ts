import _glob from 'glob'

export default function glob(pattern: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    return _glob(pattern, (err, matches) => {
      if (err) {
        reject(err)
        return
      }

      resolve(matches)
    })
  })
}
