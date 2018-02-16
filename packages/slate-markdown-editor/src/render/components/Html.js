import * as React from 'react'
import createComponent from './Component'

function Html (props) {
  let {
    openingTag,
    closingTag
  } = props.node.data.toJSON()

  const styles = theme => {
    return {
      root: {
        '&:before': {
          content: `"${openingTag}"`,
          color: theme.colors.green
        },
        '&:after': {
          content: `"${closingTag}"`,
          color: theme.colors.green
        }
      }
    }
  }

  const Component = createComponent(styles)('span')
  return <Component {...props} />
}

export default Html
