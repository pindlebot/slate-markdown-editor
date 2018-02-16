import onKeyDown from './handlers/onKeyDown'
import defaultOptions from './options'
import inline from './util/inline'

function plugin (opts = defaultOptions) {
  return {
    inline: inline,
    onKeyDown: onKeyDown.bind(null, opts),
    schema: {}
  }
}

export default plugin
