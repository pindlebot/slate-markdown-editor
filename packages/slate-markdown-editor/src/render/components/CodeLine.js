// @flow
import * as React from 'react'

const CodeLine = (props: *) => (
  <code
    {...props.attributes}
    style={{display: 'block'}}
    data-type='code_line'
  >
    {props.children}
  </code>
)

export default CodeLine
