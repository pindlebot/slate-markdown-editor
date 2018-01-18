import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'

const Blockquote = params => {
  let { attributes, children, node } = params
  
  let styles = { 
    root: { 
      ...defaultStyles,
      margin: '0 0 0 6px',
      padding: '0 0 0 6px',
      borderLeft: '1px solid #ddd'
    } 
  }

  let Component = injectSheet(styles)(
    props => React.createElement('blockquote', { className: props.classes.root }, children)
  )

  return <Component />
}

export default Blockquote