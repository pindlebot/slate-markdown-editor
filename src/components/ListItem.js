import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'

const ListItem = params => {
  let { attributes, children, node } = params
  
  let styles = { 
    root: { 
      ...defaultStyles,
      '&:before': {
        content: '"- "',
        color: '#ddd'
      }
    } 
  }

  let Component = injectSheet(styles)(
    props => React.createElement('li', { className: props.classes.root }, children)
  )

  return <Component />
}

export default ListItem