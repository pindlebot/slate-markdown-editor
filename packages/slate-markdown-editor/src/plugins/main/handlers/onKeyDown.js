// @flow
import { isKeyHotkey } from 'is-hotkey'
import { getDepth } from '../helpers'
import { insertCode } from '../changes'
import onSpace from './onSpace'
import onEnter from './onEnter'
import { type Change, type Editor } from 'slate' // eslint-disable-line

const isTab = isKeyHotkey('tab')
const isEnter = isKeyHotkey('enter')

function onKeyDown (opts: *, event: *, change: Change, editor: Editor) {
  const args = [event, change, editor]
  switch (true) {
    case event.key === ' ':
      return onSpace(...args)
    case isEnter(event):
      return onEnter(...args)
    case isTab(event):
      event.preventDefault()
      event.stopPropagation()

      if (getDepth(change) <= 1) {
        return insertCode(...args)
      }
      break
    default:
      return undefined
  }
}

export default onKeyDown
