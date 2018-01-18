import React from 'react';
import injectSheet from 'react-jss'

export default (tag, editorProps, styles) => {
  let Component = injectSheet(styles) (
    props => React.createElement(
      tag, { 
        className: props.classes.root, 
        'data-json': JSON.stringify(props.attributes),
        ...props.attributes,
      },
      props.children
    )
  )

  return <Component {...editorProps} />
}
