// @flow
import * as React from 'react'

const Paragraph = (props: *) => 
  (<p {...props.attributes}>{props.children}</p>)

export default Paragraph;