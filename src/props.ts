import onPaste from './handlers/onPaste'
import plugins from './plugins'
import renderMark from './render/renderMark'
import renderNode from './render/renderNode'

const AUTOFOCUS = true;
const PLACEHOLDER = 'What do you think? 🤔'

export default {
  onPaste,
  renderMark,
  renderNode,
  plugins,
  autofocus: AUTOFOCUS,
  placeholder: PLACEHOLDER
}
