import * as React from 'react'
import injectSheet from 'react-jss'
import * as colors from '../../styles/dark'

function Html (props) {
  return (
    <span
      {...props.attributes}
      className={props.classes.root}>
      {props.children}
    </span>
  )
}

export default props => {
  let {
    openingTag,
    closingTag
  } = props.node.data.toJSON()

  let styles = theme => {
    return {
      root: {
        '&:before': {
          content: `"${openingTag}"`,
          color: colors.green
        },
        '&:after': {
          content: `"${closingTag}"`,
          color: colors.green
        }
      }
    }
  }

  let WrappedComponent = injectSheet(styles)(Html)
  return <WrappedComponent {...props} />
}
