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
    props.node.type === 'image'
  ) {
    children = undefined
  }

  return (
    <Component
      {...props.attributes}
      className={className}
      children={children}
      style={style}
    />
  )
}

function withStyles (styles) {
  return (component) => {
    const WrappedComponent = injectSheet(styles, { theming })(BaseComponent)

    WrappedComponent.defaultProps = {
      style: {}
    }

    return props => {
      let mergedProps = props
      if (
        props.node.get('type') === 'image' ||
        props.node.get('type') === 'link'
      ) {
        const data = props.node.data.toJSON()
        mergedProps = {
          ...props,
          attributes: {
            ...props.attributes,
            ...data
          }
        }
      }

      return <WrappedComponent component={component} {...mergedProps} />
    }
  }
}

export default withStyles

export const elementNames = {
  code_line: 'code',
  code_block: 'pre',
  blockquote: 'blockquote',
  link: 'a',
  ordered_list: 'ol',
  unordered_list: 'ul',
  list_item: 'li',
  paragraph: 'div',
  unstyled: 'span',
  image: 'img'
}

export const themeKeyToElementName = name =>
  elementNames.hasOwnProperty(name)
    ? elementNames[name]
    : name

export const defaultComponent = name =>
  withStyles(theme => theme[name])(themeKeyToElementName(name))
