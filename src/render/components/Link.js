// @flow
import * as React from 'react'
import * as colors from '../../styles/dark'

const Link = (props: *) => (
  <a 
    href={props.node.data.get('href', '')}
    title={props.node.data.get('title', '')} 
    style={{color: colors.blue}} {...props.attributes}
  >
    {props.children}
  </a>
)

export default Link;