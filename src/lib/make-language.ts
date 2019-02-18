import Bluebird from 'bluebird'
import chalk from 'chalk'
import inquirer from 'inquirer'
import {cloneDeep} from 'lodash'

import formatUnit from './format-unit'
import toTransUnitMap from './to-trans-unit-map'
import {Xml} from './types'

export default async function makeLanguage({locale, base, translation}: { locale: string; base: Xml; translation?: Xml }): Promise<Xml> {
  translation = translation || cloneDeep(base)
  const result = cloneDeep(base)
  const translations = toTransUnitMap(translation.xliff.file.body['trans-unit'])

  result.xliff.file.body['trans-unit'] = await Bluebird.mapSeries(result.xliff.file.body['trans-unit'], async unit => {
    unit = formatUnit(unit)

    const translation = translations.get(unit._attributes.id)

    // there is no translation
    if (!translation || !translation.target) {
      const {target} = await inquirer.prompt({
        message: `[${locale}]: ${chalk.white(unit.source._text)}`,
        default: unit.source._text || undefined,
        name: 'target',
        type: 'input'
      })

      unit.target = cloneDeep(unit.source)
      unit.target._text = target

      return unit
    }

    // there is a translation but it differs
    if (translation && translation.source._text !== unit.source._text) {
      const {target} = await inquirer.prompt({
        message: `conflict [${locale}]: ${chalk.white(unit.source._text)}`,
        default: (unit.target && unit.target._text) || undefined,
        name: 'target',
        type: 'input'
      })

      unit.target = cloneDeep(unit.source)
      unit.target._text = target

      return unit
    }

    // translation exists and there is no conflicts
    unit.target = translation.target

    return unit
  })

  return result
}
