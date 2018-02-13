// @flow
import * as React from 'react'
import injectSheet from 'react-jss'

const Component = (props: *) => {
  let classes = [props.classes.root]

  if (props.className) classes.push(props.className)

  return React.createElement(
    props.tagName, {
      className: classes.join(' '),
      ...props.attributes
    },
    props.children
  )
}

export default (props: *) => {
  let WrappedComponent = injectSheet(props.styles)(Component)

  return <WrappedComponent {...props} />
}
