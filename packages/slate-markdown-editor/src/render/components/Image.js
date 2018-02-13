// @flow
import * as React from 'react'

const Image = (props: *) => (
  <img
    src={props.node.data.get('src', '')}
    title={props.node.data.get('title', '')}
    alt={props.node.data.get('alt', '')}
    {...props.attributes}
    data-type='image'
  />
)

export default Image
