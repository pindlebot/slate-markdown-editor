// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import * as wrapped from '../../wrapped'
import classNames from 'classNames'

const { theming } = wrapped;

function BaseComponent (props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    style,
    ...rest
  } = props

  console.log('BaseComponent', props)
  const className = classNames(classes.root, classNameProp)
  
  return (<Component
    {...props.attributes}
    className={className}
    children={props.children}
    style={style}
  />)
}

export default (styles, { component }) => {
  const Component = injectSheet(styles, { theming })(BaseComponent)
  
  Component.defaultProps = {
    style: {}
  }

  return props => <Component component={component} {...props} />
}
