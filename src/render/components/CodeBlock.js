// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import Component from './Component'

const CodeBlock = (props: *) => (
  <pre {...props.attributes} 
    className={[props.classes.root, props.syntax].join(' ')}
    data-type='code_block'>
    {props.children}
  </pre>
)

export default (props: *) => {

  let styles = theme => ({
    root: {
      backgroundColor: `${theme.borderColor} !important`,
      borderRadius: 0,
      '&:before': {
        content: '"```"',
        color: theme.foregroundColor,
        verticalAlign: 'top',
      },
      '&:after': {
        content: '"```"',
        verticalAlign: 'bottom',
        color: theme.foregroundColor,
        lineHeight: 0,   
      },
    }
  })

  let syntax = props.node.data.get('syntax', 'language-js')

  let WrappedCodeBlock = injectSheet(styles)(CodeBlock)

  return (
    <WrappedCodeBlock 
     {...props} 
     attributes={props.attributes} 
     syntax={syntax}
    />
  )
}