import fs from 'fs-extra'
import {xml2js} from 'xml-js'

import {Xml} from './types'

export default async function parseXmlFile(file: string): Promise<Xml> {
  const xml = await fs.readFile(file)

  return xml2js(xml.toString(), {compact: true}) as any
}
