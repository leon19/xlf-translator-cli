import fs from 'fs-extra'
import {js2xml} from 'xml-js'

import {Xml} from './types'

export default async function saveXmlFile({file, xml}: { file: string; xml: Xml }): Promise<void> {
  const text = js2xml(xml, {compact: true, spaces: 2}) + '\n'

  await fs.writeFile(file, text)
}
