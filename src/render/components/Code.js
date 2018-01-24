import React from 'react';
import injectSheet from 'react-jss'

const Code = props => {
  let { parent: { nodes } } = props;
  
  let styles = {
    display: 'block',
    //opacity: 0.50,
  }

  //if(
  //  (nodes.last() !== props.node &&
  //  nodes.first() !== props.node) ||
  //  props.node.isSelected
  // ) {
  //  styles.opacity = 1.0;
  //}

  return (
    <code {...props.attributes} style={styles}>
      {props.children}
    </code>
  )
}

export default Code;