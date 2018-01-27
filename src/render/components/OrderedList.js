// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import Component from './Component'
import * as colors from '../../styles/dark'

const OrderedList = props => {  
  let styles = { 
    root: { 
      'list-style-type': 'none',      
      margin: '0 0 0 20px',
      padding: 0,
    } 
  }

  return Component({tagName: 'ol', styles, ...props}) 
}

export default OrderedList