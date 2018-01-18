import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const Blockquote = props => {  
  let styles = { 
    root: { 
      ...defaultStyles,
      margin: '0 0 0 6px',
      padding: '0 0 0 6px',
      borderLeft: '1px solid #ddd'
    } 
  }

  return Component('blockquote', props, styles)  
}

export default Blockquote