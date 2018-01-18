import React from 'react';

let styles = {
  hr: {
    borderBottom: '2px solid #000', 
    display: 'block', 
    opacity: 0.2
  },
  url: {
    color: '#0366d6'
  },
  image: {
    opacity: 0.5, 
    color: '#0366d6'
  }
}

export default  {
  bold: props => <strong>{props.children}</strong>,
  code: props => <code>{props.children}</code>,
  italic: props => <em>{props.children}</em>,
  underline: props => <u>{children}</u>,
  punctuation: props => <span style={{opacity: 0.2}}>{props.children}</span>,
  url: props => <span style={styles.url}>{props.children}</span>,
  image: props => <span style={styles.image}>{props.children}</span>,
}
