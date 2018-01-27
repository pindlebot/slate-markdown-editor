import * as React from 'react';

const Unstyled = props => (
  <span {...props.attributes}>{props.children}</span>
)

export default Unstyled