import Bluebird from 'bluebird'
import chalk from 'chalk'
import inquirer from 'inquirer'
import {cloneDeep} from 'lodash'

import formatUnit from './format-unit'
import toTransUnitMap from './to-trans-unit-map'
import {Xml} from './types'

interface LanguagePromptOptions {
  locale: string
  text: string
  defaultText?: string
}

export const makeLanguagePrompt = {
  async askForTranslation({locale, text, defaultText = text}: LanguagePromptOptions): Promise<string> {
    const {result} = await inquirer.prompt({
      message: `[${locale}]: ${chalk.white(text)}`,
      default: defaultText,
      name: 'result',
      type: 'input'
    })

    return result
  },

  async resolveConflict({locale, text, defaultText}: LanguagePromptOptions): Promise<string> {
    const {result} = await inquirer.prompt({
      message: `conflict [${locale}]: ${chalk.white(text)}`,
      default: defaultText || undefined,
      name: 'result',
      type: 'input'
    })

    return result
  }
}

export default async function makeLanguage({locale, base, translation}: { locale: string; base: Xml; translation?: Xml }): Promise<Xml> {
  translation = translation || cloneDeep(base)
  const result = cloneDeep(base)
  const translations = toTransUnitMap(translation.xliff.file.body['trans-unit'])

  result.xliff.file.body['trans-unit'] = await Bluebird.mapSeries(result.xliff.file.body['trans-unit'], async unit => {
    unit = formatUnit(unit)

    const translation = translations.get(unit._attributes.id)

    // there is no translation
    if (!translation || !translation.target) {
      unit.target = cloneDeep(unit.source)
      unit.target._text = await makeLanguagePrompt.askForTranslation({locale, text: unit.source._text})

      return unit
    }

    // there is a translation but it differs
    if (translation && translation.source._text !== unit.source._text) {
      unit.target = cloneDeep(unit.source)
      unit.target._text = await makeLanguagePrompt.resolveConflict({
        locale,
        text: unit.source._text,
        defaultText: unit.target ? unit.target._text : undefined
      })

      return unit
    }

    // translation exists and there is no conflicts
    unit.target = translation.target

    return unit
  })

  return result
}
