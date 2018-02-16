// @flow
import renderMark from './render/renderMark'
import renderNode from './render/renderNode'
import createTheme from './styles/createTheme'
import components from './render/components'
import plugins from './plugins/prod'
import marks from './render/marks'

const AUTOFOCUS = true
const PLACEHOLDER = 'What do you think? 🤔'
export const PRISM_CDN = 'https://cdn.jsdelivr.net/npm/'

export default {
  renderMark,
  renderNode,
  autofocus: AUTOFOCUS,
  placeholder: PLACEHOLDER,
  theme: createTheme({}),
  components,
  marks,
  plugins,
  prism: {
    theme: 'solarizedlight'
  }
}
