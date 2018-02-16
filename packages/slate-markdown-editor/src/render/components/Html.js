import * as React from 'react'
import createComponent from './Component'

function Html (props) {
  const {
    openingTag,
    closingTag
  } = props.node.data.toJSON()

  const styles = theme => {
    return {
      root: {
        '&:before': {
          content: `"${openingTag}"`,
          color: theme.palette.accentColor
        },
        '&:after': {
          content: `"${closingTag}"`,
          color: theme.palette.accentColor
        }
      }
    }
  }

  const Component = createComponent(styles)('span')
  return <Component {...props} />
}

export default Html
