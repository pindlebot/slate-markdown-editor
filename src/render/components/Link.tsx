import * as React from 'react'
import * as colors from '../../styles/dark'

const Link = props => (
  <a href={props.node.data.get('href')} 
    className="link" 
    style={{color: colors.blue}} {...props.attributes}
  >
    {props.children}
  </a>
)

export default Link;