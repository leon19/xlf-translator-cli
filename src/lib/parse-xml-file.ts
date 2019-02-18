import fs from 'fs-extra'
import {get} from 'lodash'
import {xml2js} from 'xml-js'

import isXlfFile from './is-xlf-file'
import {Xml} from './types'

export default async function parseXmlFile(file: string): Promise<Xml> {
  const xmlText = await fs.readFile(file)

  const xml = xml2js(xmlText.toString(), {compact: true}) as any

  if (!isXlfFile(xml)) {
    throw new Error(`\`${file}\` is not valid \`.xlf\` file`)
  }

  const transUnits = get(xml, ['xliff', 'file', 'body', 'trans-unit'])

  // if there is only one element xml-js will return an object and we always want an array
  xml.xliff.file.body['trans-unit'] = Array.isArray(transUnits) ? transUnits : [transUnits]

  return xml
}
