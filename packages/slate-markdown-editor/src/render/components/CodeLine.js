// @flow
import * as React from 'react'

function CodeLine (props: *) {
  return (
    <code
      {...props.attributes}
      style={{display: 'block'}}
    >
      {props.children}
    </code>
  )
}

export default CodeLine
