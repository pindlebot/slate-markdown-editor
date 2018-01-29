// @flow
import * as React from 'react'
import * as colors from '../../styles/dark'

const Image = (props: *) => (
  <img 
    src={props.node.data.get('src', '')} 
    title={props.node.data.get('title', '')}
    alt={props.node.data.get('alt', '')}
    {...props.attributes}
    data-type='image'
  >
    {props.children}
  </img>
)

export default Image;