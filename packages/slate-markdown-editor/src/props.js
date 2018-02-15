// @flow
import renderMark from './render/renderMark'
import renderNode from './render/renderNode'
import theme from './styles/dark'
import * as components from './render/components'

const AUTOFOCUS = true
const PLACEHOLDER = 'What do you think? 🤔'
export const PRISM_CDN = 'https://cdn.jsdelivr.net/npm/'

export default {
  renderMark,
  renderNode,
  autofocus: AUTOFOCUS,
  placeholder: PLACEHOLDER,
  theme,
  components,
  prism: {
    theme: 'okaidia'
  }
}
