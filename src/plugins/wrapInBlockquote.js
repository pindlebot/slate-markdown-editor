// @flow
import * as curry from 'lodash.curry'
import { clear } from '../util'
import * as plugins from '../plugins'

function WrapInBlockquote (event, change, editor) {
  event.preventDefault()     
  change.call(clear)      

  editor.props.onChange(
    plugins.editBlockquote.changes.wrapInBlockquote(change)
  )

  return true
}

export default WrapInBlockquote