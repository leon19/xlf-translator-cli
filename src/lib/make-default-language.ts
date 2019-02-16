import {cloneDeep} from 'lodash'

import formatUnit from './format-unit'
import {Xml} from './types'

/**
 * Add to `xml` a translation equal to the source
 */
export default function makeDefaultLanguage(xml: Xml): Xml {
  xml = cloneDeep(xml)
  xml.xliff.file.body['trans-unit'] = xml.xliff.file.body['trans-unit'].map(unit => formatUnit(unit, {target: unit.source}))

  return xml
}
