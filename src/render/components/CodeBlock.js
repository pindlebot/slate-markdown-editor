import React from 'react';
import injectSheet from 'react-jss'
import Component from './Component'
import * as colors from '../../styles/dark'

const CodeBlock = props => {
  let { parent: { nodes } } = props;
  
  let styles = {
    root: {
      backgroundColor: `${colors.borderColor} !important`,
      borderRadius: 0,
      '&:before': {
        content: '"```"',
        color: colors.green,
        verticalAlign: 'top',
        //lineHeight: 0,  
      },
      '&:after': {
        content: '"```"',
        verticalAlign: 'bottom',
        color: colors.green,
        lineHeight: 0,   
      },
    }
  }

  //if(
  //  (nodes.last() !== props.node &&
  //  nodes.first() !== props.node) ||
  //  props.node.isSelected
  // ) {
  //  styles.opacity = 1.0;
  //}
  console.log(props.node.toJSON())
  console.log(props)
  let syntax = props.node.data.get('syntax').trim()
  
  let attributes = {
    ...props.attributes,
    'data-syntax': syntax
  }

  return Component({
    tagName: 'pre', 
    className: syntax, 
    styles, 
    attributes,
    ...props
  })

  //return (
  //  <pre {...attributes} className={props.node.data.get('syntax')}>
  //    {props.children}
  //  </pre>
  //)
}

export default CodeBlock;