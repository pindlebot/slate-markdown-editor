import React from 'react';
import injectSheet from 'react-jss'

const UnorderedList = params => {
  let { attributes, children, node } = params
  
  let styles = { 
    root: { 
      'list-style-type': 'none',      
      padding: '0 0 0 12px',
    } 
  }

  let Component = injectSheet(styles)(
    props => React.createElement('ul', { className: props.classes.root }, children)
  )

  return <Component />
}

export default UnorderedList