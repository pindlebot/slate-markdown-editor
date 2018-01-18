import React from 'react'

const pre = {
  backgroundColor: '#fafafa',
  color: '#555'
};

export default props => (
  <div style={{padding: '6px 0'}}>
    <span style={{float: 'right'}}>lang: {props.node.data.get('lang')}</span>
    <pre {...props.attributes} style={pre}>
      {props.children}
    </pre>
  </div>
)