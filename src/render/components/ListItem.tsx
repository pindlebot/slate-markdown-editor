import * as React from 'react'
import injectSheet from 'react-jss'
import defaultStyles from '../../styles/defaultStyles'
import * as colors from '../../styles/dark'
import Component from './Component'
import * as plugins from '../../plugins'
import { getDepth } from '../../util'

const ListItem = props => {
  let { 
    attributes, 
    children, 
    node, 
    editor, 
    parent 
  } = props
  
  const isCurrentItem = plugins.editList.utils
    .getItemsAtRange(editor.value)
    .contains(node)
 
  let key = node.get('key')
  let index = parent.nodes.map(node => node.get('key')).indexOf(key)

  let className = isCurrentItem ? 'current-item' : undefined
  
  let prefix = props.parent.type === 'unordered_list' ? 
    '-' : index + 1 + '.'
  
  let styles = { 
    root: { 
      ...defaultStyles,
      '&:before': {
        content: `"${prefix} "`, 
        color: colors.magenta,
        //color: (depth/2) % 2 === 0 ? colors.magenta : colors.cyan
      },
      '& p': {
        display: 'inline-block',
        marginBottom: 0
      }
    } 
  }
  return Component({tagName: 'li', styles, className, ...props})
}

export default ListItem