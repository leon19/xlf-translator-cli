import {get} from 'lodash'

import {Xml} from './types'

export default function isXlfFile(xml: any): xml is Xml {
  const transUnits = get(xml, ['xliff', 'file', 'body', 'trans-unit'])

  return Boolean(transUnits)
}
