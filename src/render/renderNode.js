// @flow
import * as plugins from '../plugins'
import * as React from 'react'
import * as blocks from './components';
import * as colors from '../styles/dark'
import { getAttributes } from '../util'
import * as url from 'url'

export default (props: *) => {
  const { 
    node, 
    children, 
    attributes, 
    editor 
  } = props;
  
  let json = node.toJSON()

  if(blocks[node.type]) {
    let type = node.type;
    
    if(
      node.type == 'html' && 
      json.data.closingTag == '</script>'
    ) {
      let attributes = getAttributes(node.data.toJSON())
      if(attributes.src) {
        props.script = attributes;
        
        let { host } = url.parse(attributes.src);
        if(host === 'gist.github.com') {
          type = 'gist'
        } else {
          type = 'script'
        }
      }
    }

    return blocks[type](props)
  } else {
    console.warn(`"${node.type}" block type not found.`)
  }

  return null
}