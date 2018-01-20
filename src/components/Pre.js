import React from 'react'

const pre = {
  backgroundColor: '#fafafa',
  color: '#555',
  fontSize: '14px'
};

export default props => (
  <div style={{
    //padding: '6px 0', 
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    color: '#555',
    fontSize: '14px'
  }}>
    <pre {...props.attributes}>
      {props.children}
    </pre>
    <div>
      <div style={{
        fontFamily: '"monospace"',
        padding: '2px 10px',
        backgroundColor: '#999',
        color: '#fff'
      }}>
      {props.node.data.get('lang')}
      </div>
    </div>
    
  </div>
)