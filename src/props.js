// @flow
import renderMark from './render/renderMark'
import renderNode from './render/renderNode'

const AUTOFOCUS = true;
const PLACEHOLDER = 'What do you think? 🤔'

export default {
  renderMark,
  renderNode,
  autofocus: AUTOFOCUS,
  placeholder: PLACEHOLDER
}
