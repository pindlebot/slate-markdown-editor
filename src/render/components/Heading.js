import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const Heading = editorProps => {
  let { attributes, node, parent } = editorProps;
  console.log(editorProps)
  let depth = node.data.get('depth')
  let tag = 'h' + depth;
  let content = '#'.repeat(depth) + ' '

  let styles = { 
    root: { 
      ...defaultStyles,
      display: parent.get('type') === 'li' ? 'inline-block' : 'block',
      '&:before': {
        content: `"${content}"`,
        color: '#ddd'
      }
    } 
  }
  if(parent.get('type') === 'li') {
    styles.root.marginTop = 0;
  }

  return Component(tag, editorProps, styles)
}

export default Heading;