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

function onKeyDown (props: Props, event: *, change: Change) {
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