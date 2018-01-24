import React from 'react';
import injectSheet from 'react-jss'

export default (tagName, editorProps, styles, className) => {
  
  let Component = injectSheet(styles) (
    props => {
      let classes = [props.classes.root]
      
      if(className) classes.push(className)      
      
      return React.createElement(
        tagName, { 
          className: classes.join(' '), 
          'data-json': JSON.stringify(props.attributes),
          ...props.attributes,
        },
        props.children
      )
    }
  )

  return <Component {...editorProps} />
}
