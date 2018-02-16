// @flow
import * as React from 'react'

function Image (props: *) {
  return (
    <img
      src={props.node.data.get('src', '')}
      title={props.node.data.get('title', '')}
      alt={props.node.data.get('alt', '')}
      {...props.attributes}
      data-type='image'
    />)
}

export default Image
