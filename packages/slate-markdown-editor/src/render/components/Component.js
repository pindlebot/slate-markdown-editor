// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import * as wrapped from '../../wrapped'
import classnames from 'classnames'

const { theming } = wrapped

function BaseComponent (props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    style,
    ...rest
  } = props

  let { children } = props

  const className = classnames(classes.root, classNameProp)
  
  if (
    !(children && children.length > 0) ||
    props.node.type === 'img'
  ) {
    children = undefined
  }

  return (<Component
    {...props.attributes}
    className={className}
    children={children}
    style={style}
  />)
}

function withStyles (styles) {
  return (component) => {
    const WrappedComponent = injectSheet(styles, { theming })(BaseComponent)

    WrappedComponent.defaultProps = {
      style: {}
    }

    return props => {
      const data = props.node.data.toJSON()

      //for (let key in data) {
      //  props[key] = data[key]
      //}

      const mergedProps = {
        ...props,
        attributes: {
          ...props.attributes,
          ...data
        }
      }
      
      return <WrappedComponent component={component} {...mergedProps} />
    }
  }
}

export default withStyles
