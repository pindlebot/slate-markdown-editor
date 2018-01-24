import * as plugins from '../plugins'
import React from 'react'
import UnorderedList from './components/UnorderedList'
import ListItem from './components/ListItem'

export default props => {
  const { 
    node, 
    children, 
    attributes, 
    editor 
  } = props;

  console.log(props.node.type)

  const blocks = {
    list_item: ListItem,
    ul_list: UnorderedList,
    ol_list: props => <ol {...attributes}>{children}</ol>,
    code_block: props => (
      <div className="code" {...attributes} style={{backgroundColor: '#fafafa'}}>
        {children}
      </div>
    ),
    code_line: props => <pre {...attributes}>{children}</pre>,
    blockquote: props => <blockquote {...attributes}>{children}</blockquote>,
    paragraph: props => <p {...attributes}>{children}</p>,
    heading: props => <h1 {...attributes}>{children}</h1>,
  }

  return blocks[node.type](props)
}