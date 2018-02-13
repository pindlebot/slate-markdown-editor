import { isKeyHotkey } from 'is-hotkey'

const HEADING_RE = require('markup-it/lib/markdown/re/heading')

const isTab = isKeyHotkey('tab')
const isEnter = isKeyHotkey('enter')
const isBackspace = isKeyHotkey('backspace')

const isHeading = (opts, change) => opts.blocks.indexOf(change.value.startBlock.type) > -1

function onSpace (opts, event, change, editor) {
  let { startBlock } = change.value
  let { text } = startBlock

  if (!opts.re.test(text)) return undefined

  let matches = opts.re.exec(text)
  let depth = (matches[1] || matches[0]).length
  let data = { depth }

  if (opts.clear) {
    change
      .extendToStartOf(startBlock)
      .delete()
  }
  let type = opts.blocks[depth - 1]
  if (!type) return
  change.setBlock({type, data })

  return true
}

function onEnter (opts, event, change, editor) {
  let { value: { startBlock } } = change

  if (!isHeading(opts, change)) return

  event.preventDefault()

  change
    .splitBlock()
    .setBlock(opts.defaultBlock)

  return true
}

function onBackspace (opts, event, change, editor) {
  let { value: { startBlock } } = change

  if (!isHeading(opts, change)) return
  if (startBlock.text.length !== 0) return

  event.preventDefault()

  change.setBlock(opts.defaultBlock)

  return true
}

function onKeyDown (
  opts,
  event,
  change,
  editor
) {
  const args = [opts, event, change, editor]

  if (event.key == ' ') return onSpace(...args)
  else if (isEnter(event)) return onEnter(...args)
  else if (isBackspace(event)) return onBackspace(...args)
  return undefined
}

const defaultOpts = {
  defaultBlock: 'paragraph',
  blocks: [
    'header_one',
    'header_two',
    'header_three',
    'header_four',
    'header_five',
    'header_six'
  ],
  clear: true,
  re: HEADING_RE.normal
}

function core (opts = defaultOpts) {
  return {
    onKeyDown: onKeyDown.bind(null, opts),
    schema: {
      normalize: (change, reason, context) => {
        if (reason == 'child_type_invalid') {
          change.setNodeByKey(context.child.key, { type: 'paragraph' })
        }
      }
    }
  }
}

export default core
