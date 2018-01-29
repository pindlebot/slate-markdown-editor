// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import defaultStyles from '../../styles/defaultStyles'
import * as colors from '../../styles/dark'
import Component from './Component'

const Blockquote = (props: *) => {  
  let styles = theme => ({ 
    root: { 
      ...defaultStyles,
      margin: '0 0 0 10px',
      padding: '0 0 0 10px',
      borderLeft: '2px solid ' + theme.cyan,
      backgroundColor: theme.lightBlack
    } 
  })

  return Component({
    tagName: 'blockquote',
    styles, 
    ...props
  })  
}

export default Blockquote