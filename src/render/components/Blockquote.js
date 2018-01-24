import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const Blockquote = props => {  
  let styles = { 
    root: { 
      ...defaultStyles,
      margin: '0 0 0 10px',
      padding: '0 0 0 10px',
      borderLeft: '2px solid #999',
      backgroundColor: '#fafafa'
    } 
  }

  return Component({tagName: 'blockquote', styles, ...props})  
}

export default Blockquote