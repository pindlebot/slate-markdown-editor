// @flow
import * as React from 'react';

const Unstyled = (props: *) => (
  <div {...props.attributes} data-type='unstyled'>{props.children}</div>
)

export default Unstyled