// @flow
import * as React from 'react'
import createComponent from './Component'

const styles = theme => theme.code_block

const Component = createComponent(styles)('pre')

function CodeBlock (props: *) {
  const syntax = props.node.data.get('syntax', 'language-js')
  return (
    <Component {...props} className={syntax} />
  )
}

export default CodeBlock
