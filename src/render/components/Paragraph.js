// @flow
import * as React from 'react'

const Paragraph = (props: *) => 
  (<div {...props.attributes}>{props.children}</div>)

export default Paragraph;