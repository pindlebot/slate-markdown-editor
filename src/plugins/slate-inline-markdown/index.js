import onKeyDown from './handlers/onKeyDown'
import defaultOptions from './options'

function core(opts = defaultOptions) {
  return {
    onKeyDown: onKeyDown.bind(null, opts)
  }
}

export default core;