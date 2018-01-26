import onKeyDown from './handlers/onKeyDown'
import defaultOptions from './options'

function plugin(opts = defaultOptions) {
  return {
    onKeyDown: onKeyDown.bind(null, opts)
  }
}

exports.plugin = plugin;
export default plugin;