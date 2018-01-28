// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import Component from './Component'
import * as colors from '../../styles/dark'

const UnorderedList = (props: *) => {  
  let styles = { 
    root: { 
      'list-style-type': 'none',      
      margin: '0 0 0 20px',
      padding: 0,
    } 
  }

  return Component({
    tagName: 'ul', 
    styles, 
    ...props
  }) 
}

export default UnorderedList