import * as curry from 'lodash.curry'
import { clear } from '../util'
import * as plugins from '../plugins'

function WrapInBlockquote (props, event, change) {
  event.preventDefault()     
  change.call(clear)      

  props.onChange(
    plugins.editBlockquote.changes.wrapInBlockquote(change)
  )

  return true
}

export default WrapInBlockquote