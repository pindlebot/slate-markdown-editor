// @flow
import * as React from 'react'
import createComponent from './Component'

const styles = theme => ({
  root: {
    backgroundColor: `${theme.colors.borderColor} !important`,
    borderRadius: 0,
    '&:before': {
      content: '"```"',
      color: theme.colors.foregroundColor,
      verticalAlign: 'top'
    },
    '&:after': {
      content: '"```"',
      verticalAlign: 'bottom',
      color: theme.colors.foregroundColor,
      lineHeight: 0
    }
  }
})

const Component = createComponent(styles, { component: 'pre' })

function CodeBlock (props: *) {
  const syntax = props.node.data.get('syntax', 'language-js')
  return (
    <Component {...props} className={syntax} />
  )
}

export default CodeBlock
