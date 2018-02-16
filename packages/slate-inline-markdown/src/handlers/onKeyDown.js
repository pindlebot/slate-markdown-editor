import * as changes from '../changes'
import { applyRules, getLastText } from '../util'

function handle (opts, event, change, editor) {
  let { startBlock, startOffset } = change.value
  if (opts.skip(change)) return

  let texts = getLastText(change)
  if (!texts) return
  texts = texts.split(' ')
  let text = texts[texts.length - 1]
  let tokens = applyRules(opts.rules, opts.schema)(text + event.key)

  if (
    !tokens ||
    !tokens.length ||
    !tokens[0].text
  ) return

  let token = tokens[0]
  event.preventDefault()

  switch (true) {
    case token.object == 'mark':
      change.call(changes.replaceText(token))
      change.call(changes.insertMark(token))

      return true
    case token.type == 'link':
    case token.type == 'image':
      change
        .call(changes.replaceText(token))
        .wrapInline({
          type: token.type,
          data: token.data
        })
        .call(changes.insertSpace)
      return true

    case token.type == 'html':
      change
        .removeNodeByKey(change.value.startBlock.key)

      if (token.data.innerHtml) {
        change
          .insertText(token.data.innerHtml)
          .wrapBlock({ type: token.type, data: token.data })
      } else {
        change
          .insertBlock({
            type: token.type,
            data: token.data
          })
      }
      change.insertBlock('paragraph')
      return true
    default:
      return undefined
  }
}

export default function onKeyDown (
  opts,
  event,
  change,
  editor
) {
  const args = [opts, event, change, editor]
  if (opts.keys.indexOf(event.key) > -1) return handle(...args)
  if (event.key == 'Backspace') {
    if (change.value.startBlock.type == 'html') {}
  }
}
