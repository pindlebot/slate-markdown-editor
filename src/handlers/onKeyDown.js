// @flow
import { isKeyHotkey } from 'is-hotkey';
import { getDepth } from '../util'
import toggleCode from '../plugins/toggleCode'
import onSpace from './onSpace'
import onEnter from './onEnter'
import { type Change } from 'slate'

const isTab : any = isKeyHotkey('tab');
const isEnter : any = isKeyHotkey('enter');
const isBackspace : any = isKeyHotkey('backspace');

type Props = {
  onChange: () => mixed
}

function onKeyDown (event: *, change: Change, editor: *) {
  const args = [event, change, editor]

  if(event.key == ' ') return onSpace(...args)
  if(isEnter(event)) return onEnter(...args)
  if(isTab(event)) {
    event.preventDefault();
    event.stopPropagation();
      
    if(getDepth(change) <= 1) {
      return toggleCode(...args)
    }
  }
  
  return
}

export default onKeyDown