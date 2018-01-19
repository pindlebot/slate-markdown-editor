import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'
import Component from './Component'

const ListItem = params => {
  let { attributes, children, node } = params
  
  let styles = { 
    root: { 
      ...defaultStyles,
      '&:before': {
        content: '"— "',
        color: '#999'
      }
    } 
  }

  return Component('li', params, styles)
}

export default ListItem