import * as React from 'react'

const CodeLine = props => (
  <code {...props.attributes} style={{display: 'block'}}>
    {props.children}
  </code>
)

export default CodeLine;