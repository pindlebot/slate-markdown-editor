import * as plugins from '../plugins'
import React from 'react'
import * as components from './components';
import * as colors from '../styles/dark'

export default props => {
  const { 
    node, 
    children, 
    attributes, 
    editor 
  } = props;

  const blocks = {
    ...components,
    unstyled: props => <span {...attributes}>{children}</span>,
    code_line: props => <code {...attributes} style={{display: 'block'}}>{children}</code>,
    paragraph: props => <p {...attributes}>{children}</p>,
    link: props => (
      <a href={props.node.data.get('href')} 
        className="link" 
        style={{color: colors.blue}} {...attributes}
      >
        {children}
      </a>
    )
  }

  return blocks[node.type](props)
}