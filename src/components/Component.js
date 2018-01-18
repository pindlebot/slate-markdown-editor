import React from 'react';
import injectSheet from 'react-jss'

export default props => {
  let {
    children,
    style,
    tag,    
    ...rest,
  } = props;

  let Component = injectSheet(style)(
    props => React.createElement(tag, { className: props.classes.root }, children)
  )

  return <Component />
}