// @flow
import * as plugins from '../plugins'
import * as React from 'react'
import * as blocks from './components';
import * as colors from '../styles/dark'

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