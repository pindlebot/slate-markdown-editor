// @flow
import { getEventTransfer } from 'slate-react'
import { fromMarkdown } from '../helpers'
import { type Change, type Editor } from 'slate' // eslint-disable-line

function onPaste (opts: *, event: *, change: Change, editor: Editor) {
  const transfer = getEventTransfer(event)
  if (!transfer.text) return undefined

  try {
    const value = fromMarkdown(transfer.text)
    change.insertFragment(value.document)
    return true
  } catch (err) {
    console.warn('error', err)
    return undefined
  }
}

export default onPaste
