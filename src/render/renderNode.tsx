import * as plugins from '../plugins'
import * as React from 'react'
import * as components from './components';
import * as colors from '../styles/dark'

const blocks = {
  ...components,
  unstyled: props => <span {...props.attributes}>{props.children}</span>,
  code_line: props => (<code {...props.attributes} style={{display: 'block'}}>
    {props.children}
  </code>),
  paragraph: props => <p {...props.attributes}>{props.children}</p>,
  link: props => (
    <a href={props.node.data.get('href')} 
      className="link" 
      style={{color: colors.blue}} {...props.attributes}
    >
      {props.children}
    </a>
  )
}

export default props => {
  const { 
    node, 
    children, 
    attributes, 
    editor 
  } = props;
  
  if(blocks[node.type]) {
    return blocks[node.type](props)
  } else {
    console.warn(`"${node.type}" block type not found.`)
  }

  return null
}