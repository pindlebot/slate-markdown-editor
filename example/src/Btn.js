import React from 'react'

const styles = {
  whiteSpace: 'nowrap',
  display: 'inline-block',
  height: '40px',
  lineHeight: '32px',
  margin: '0',
  padding: '0 14px',
  boxShadow: 'rgba(50, 50, 93, 0.109804) 0px 4px 6px 0px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px 0px',
  fontSize: '15px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  color: '#777',
  textDecoration: 'none',
  transition: 'all .15s ease',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  maxWidth: '260px',
  marginRight: '1em',
}

export default props => (
  <button onClick={() => this.props.load()} style={styles}>Load</button>
)