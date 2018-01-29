// @flow
import * as React from 'react';

const Unstyled = (props: *) => (
  <div {...props.attributes}>{props.children}</div>
)

export default Unstyled