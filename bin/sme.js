const path = require('path')
const fs = require('fs')
const pkg = require('../packages/slate-markdown-editor/package.json')
const execa = require('execa')
const write = require('util').promisify(fs.writeFile)

async function run () {
  await execa.shell('babel packages/slate-markdown-editor/src -d packages/slate-markdown-editor/lib')

  const version = pkg.dependencies.prismjs.slice(1, pkg.dependencies.prismjs.length)

  const pathToConstants = path.join(__dirname, '../packages/slate-markdown-editor/lib/constants.js')

  const str = `exports.prism = '${version}'`
  await write(pathToConstants, str, { encoding: 'utf8' })

  await write(
    path.join(__dirname, '../packages/slate-markdown-editor/lib/plugins/dev.js'),
    'exports.default = []',
    { encoding: 'utf8' }
  )
}

run()
