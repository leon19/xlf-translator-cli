xlf-translator-cli
==================

Translate angular xliff xml translation files

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/xlf-translator-cli.svg)](https://npmjs.org/package/xlf-translator-cli)
[![CircleCI](https://circleci.com/gh/leon19/xlf-translator-cli/tree/master.svg?style=shield)](https://circleci.com/gh/leon19/xlf-translator-cli/tree/master)
[![Codecov](https://codecov.io/gh/leon19/xlf-translator-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/leon19/xlf-translator-cli)
[![Downloads/week](https://img.shields.io/npm/dw/xlf-translator-cli.svg)](https://npmjs.org/package/xlf-translator-cli)
[![License](https://img.shields.io/npm/l/xlf-translator-cli.svg)](https://github.com/leon19/xlf-translator-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g xlf-translator-cli
$ xlf-translator COMMAND
running command...
$ xlf-translator (-v|--version|version)
xlf-translator-cli/0.0.0 linux-x64 node-v11.4.0
$ xlf-translator --help [COMMAND]
USAGE
  $ xlf-translator COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`xlf-translator help [COMMAND]`](#xlf-translator-help-command)
* [`xlf-translator update`](#xlf-translator-update)

## `xlf-translator help [COMMAND]`

display help for xlf-translator

```
USAGE
  $ xlf-translator help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `xlf-translator update`

update the translation files

```
USAGE
  $ xlf-translator update

OPTIONS
  -l, --location=location  (required) folder where translation files are located
```

_See code: [src/commands/update.ts](https://github.com/leon19/xlf-translator-cli/blob/v0.0.0/src/commands/update.ts)_
<!-- commandsstop -->