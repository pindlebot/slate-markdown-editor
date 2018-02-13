import onKeyDown from './handlers/onKeyDown'
import onPaste from './handlers/onPaste'
import * as helpers from './helpers'
export default (opts) => {
  return {
    onKeyDown: onKeyDown.bind(null, opts),
    onPaste: onPaste.bind(null, opts),
    helpers: helpers
  }
}
