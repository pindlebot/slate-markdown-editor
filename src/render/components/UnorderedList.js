import React from 'react';
import injectSheet from 'react-jss'
import Component from './Component'

const UnorderedList = props => {  
  let styles = { 
    root: { 
      'list-style-type': 'none',      
      padding: '0 0 0 12px',
    } 
  }

  return Component({tagName: 'ul', styles, ...props}) 
}

export default UnorderedList