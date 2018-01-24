import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'
import * as plugins from '../../plugins'

const ListItem = props => {
  let { attributes, children, node, editor } = props
  
  const isCurrentItem = plugins.editList.utils
    .getItemsAtRange(editor.value)
    .contains(node)
 
  let className = isCurrentItem ? 'current-item' : undefined

  let styles = { 
    root: { 
      ...defaultStyles,
      '&:before': {
        content: '"— "',
        color: '#999'
      },
      '& p': {
        display: 'inline-block'
      }
    } 
  }

  return Component('li', props, styles, className)
}

export default ListItem