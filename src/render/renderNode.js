import * as plugins from '../plugins'
import React from 'react'
import * as components from './components';

export default props => {
  const { 
    node, 
    children, 
    attributes, 
    editor 
  } = props;

  console.log(props.node.toJSON())
  console.log(attributes)
  console.log(editor)

  const blocks = {
    ...components,
    ol_list: props => <ol {...attributes}>{children}</ol>,
    code_line: props => <code {...attributes} style={{display: 'block'}}>{children}</code>,
    paragraph: props => <p {...attributes}>{children}</p>,
    heading: props => <h1 {...attributes}>{children}</h1>,
    link: props => (
      <a href={props.node.data.get('href')} 
        className="link" 
        style={{color: 'blue'}} {...attributes}
      >
        {children}
      </a>
    )
  }

  return blocks[node.type](props)
}