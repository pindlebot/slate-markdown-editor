import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const Heading = props => {
  let { attributes, node, parent } = props;
  let depth = node.data.get('depth')
  let tagName = 'h' + depth;
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

  console.log(node.toJSON())
  
  if(parent.get('type') === 'li') {
    styles.root.marginTop = 0;
  }

  return Component({tagName, styles, ...props})
}

export default Heading;