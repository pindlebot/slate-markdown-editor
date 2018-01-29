// @flow
import * as React from 'react'

const Paragraph = (props: *) => 
  (<div {...props.attributes} data-type='paragraph'>{props.children}</div>)

export default Paragraph;