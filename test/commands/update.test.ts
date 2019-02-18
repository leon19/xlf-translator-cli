import {test} from '@oclif/test'
import path from 'path'
import sinon from 'sinon'

import {updateExitCodes, updatePrompt} from '../../src/commands/update'
import {makeLanguagePrompt} from '../../src/lib/make-language'

const location = path.join(__dirname, '../assets/translations')
const files = {
  messages: path.join(__dirname, '../assets/translations/messages.xlf'),
  noNeedTranslation: {
    messages: path.join(__dirname, '../assets/translations/no-need-translation/messages.xlf'),
    english: path.join(__dirname, '../assets/translations/no-need-translation/messages.en.xlf')
  },
  askTranslation: {
    messages: path.join(__dirname, '../assets/translations/ask-translation/messages.xlf'),
    english: path.join(__dirname, '../assets/translations/ask-translation/messages.en.xlf')
  },
  noTranslations: {
    messages: path.join(__dirname, '../assets/translations/no-translations/messages.xlf')
  },
  updateTranslations: {
    messages: path.join(__dirname, '../assets/translations/update-translation-inputs/messages.xlf'),
    english: path.join(__dirname, '../assets/translations/update-translation-inputs/messages.en.xlf')
  }
}

describe('update', () => {
  test
    .stdout()
    .stderr()
    .command(['update', '--location', __dirname])
    .exit(updateExitCodes.noBaseTranslationFound)
    .it('should exit the program when no `messages.xlf` are found')

  test
    .stdout()
    .stderr()
    .stub(updatePrompt, 'selectBaseFile', sinon.stub().resolves(files.noNeedTranslation.messages))
    .stub(updatePrompt, 'selectFileToTranslate', sinon.stub().resolves([files.noNeedTranslation.english]))
    .command(['update', '--location', location])
    .it('should ask for base file when more than one `messages.xlf` file is found')

  test
    .stdout()
    .stderr()
    .stub(updatePrompt, 'selectFileToTranslate', sinon.stub().resolves([files.noNeedTranslation.english]))
    .command(['update', '--location', path.join(location, 'ask-translation')])
    .it('should ask the user to select a files to translate when the `messages.xlf` is selected')

  test
    .stdout()
    .stderr()
    .command(['update', '--location', path.join(location, 'no-translations')])
    .exit(updateExitCodes.noTranslationsFound)
    .it('should exit the program when the `messages.xlf` file is selected and there are no translation files')

  test
    .stdout()
    .stderr()
    .stub(updatePrompt, 'selectFileToTranslate', sinon.stub().resolves([files.askTranslation.english]))
    .stub(makeLanguagePrompt, 'askForTranslation', sinon.stub().resolves('my translation'))
    .command(['update', '--location', path.join(location, 'ask-translation')])
    .it('should ask the user for missing translations', () => {
      // TODO: check translation file is updated
    })

  test
    .stdout()
    .stderr()
    .stub(updatePrompt, 'selectFileToTranslate', sinon.stub().resolves([files.updateTranslations.english]))
    .stub(makeLanguagePrompt, 'askForTranslation', sinon.stub().resolves('my translation'))
    .command(['update', '--location', path.join(location, 'update-translation-inputs')])
    .it('should update the translations based on the base file', () => {
      // TODO: check old trans units are replaced by the base file
    })
})
