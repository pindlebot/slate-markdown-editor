import React from 'react';
import injectSheet from 'react-jss'
import defaultStyles from '../styles'

const Heading = params => {
  let { attributes, children, node } = params
  
  let data = node.data.toJSON()
  let tag = 'h' + data.depth;
  let content = '#'.repeat(data.depth) + ' '

  let styles = { 
    root: { 
      ...defaultStyles,
      '&:before': {
        content: `"${content}"`,
        color: '#ddd'
      }
    } 
  }

  let Component = injectSheet(styles)(
    props => React.createElement(tag, { className: props.classes.root }, children)
  )

  return <Component />
}

export default Heading;