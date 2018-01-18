import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const Heading = editorProps => {
  let { attributes, node } = editorProps;
  console.log(editorProps)
  let depth = node.data.get('depth')
  let tag = 'h' + depth;
  let content = '#'.repeat(depth) + ' '

  let styles = { 
    root: { 
      ...defaultStyles,
      display: 'inline-block',
      '&:before': {
        content: `"${content}"`,
        color: '#ddd'
      }
    } 
  }
  return Component(tag, editorProps, styles)
}

export default Heading;