import * as curry from 'lodash.curry'
import { isKeyHotkey } from 'is-hotkey';
import { getDepth } from '../util'
import toggleCode from '../plugins/toggleCode'
import onSpace from './onSpace'
import onEnter from './onEnter'

const isTab : any = isKeyHotkey('tab');
const isEnter : any = isKeyHotkey('enter');
const isBackspace : any = isKeyHotkey('backspace');

function onKeyDown (props, event, change) {
  const args = [props, event, change]

  if(event.key == ' ') return onSpace(props, event, change)
  if(isEnter(event)) return onEnter(props, event, change)
  if(isTab(event)) {
    event.preventDefault();
    event.stopPropagation();
    
    if(getDepth(change) <= 1) {
      return toggleCode(props, event, change)
    }
  }
  return
}

export default onKeyDown