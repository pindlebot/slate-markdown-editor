// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import defaultStyles from '../../styles/defaultStyles'
import * as colors from '../../styles/dark'
import Component from './Component'
import { getDepth } from '../../util'

const ListItem = (props: *) => {
  let { 
    attributes, 
    children, 
    node, 
    editor, 
    parent 
  } = props
  
  let editListPlugin = props.editor.props.plugins.find(plugin => 
    plugin.name === 'slate_edit_list'
  )
  const isCurrentItem = editListPlugin.utils
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
      },
      '& > *': {
        display: 'inline-block',
        marginBottom: 0
      }
    } 
  }

  return Component({
    tagName: 'li', 
    styles, 
    className, 
    ...props
  })
}

export default ListItem