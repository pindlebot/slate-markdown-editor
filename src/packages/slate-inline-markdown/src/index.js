import onKeyDown from './handlers/onKeyDown'
import defaultOptions from './options'

function plugin(opts = defaultOptions) {
  return {
    onKeyDown: onKeyDown.bind(null, opts),
    schema: {},
    /*validateNode: (node) => {
      
      if(process.env.NODE_ENV !== 'production') {
        console.log('validateNode', node)
      }
      
      return (change) => {
        if(process.env.NODE_ENV !== 'production') {
          console.log('validateNode', change)
        }
        return undefined;
      }
    }*/
  }
}

exports.plugin = plugin;
export default plugin;