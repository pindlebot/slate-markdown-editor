// @flow
import { isKeyHotkey } from 'is-hotkey';
import { getDepth } from '../helpers'
import { insertCode } from '../changes'
import onSpace from './onSpace'
import onEnter from './onEnter'
import { type Change, type Editor } from 'slate'

const isTab : any = isKeyHotkey('tab');
const isEnter : any = isKeyHotkey('enter');
const isBackspace : any = isKeyHotkey('backspace');

function onKeyDown (opts: *, event: *, change: Change, editor: Editor) {
  const args = [event, change, editor]
  console.log('onKeyDown - args',args)
  switch(true) {
    case event.key == ' ':
      return onSpace(...args)
    case isEnter(event):
      return onEnter(...args)
    case isTab(event):
      event.preventDefault();
      event.stopPropagation();
        
      if(getDepth(change) <= 1) {
        return insertCode(...args)
      }
    default:
      return undefined
  }
}

export default onKeyDown