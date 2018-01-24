import React from 'react';
import injectSheet from 'react-jss'

const CodeBlock = props => {
  let { parent: { nodes } } = props;
  
  let styles = {
    //display: 'block',
    //opacity: 0.50,
  }

  //if(
  //  (nodes.last() !== props.node &&
  //  nodes.first() !== props.node) ||
  //  props.node.isSelected
  // ) {
  //  styles.opacity = 1.0;
  //}
  let attributes = {
    ...props.attributes,
    'data-syntax': props.node.data.get('syntax')
  }
  return (
    <pre {...attributes} className={props.node.data.get('syntax')}>
      {props.children}
    </pre>
  )
}

export default CodeBlock;