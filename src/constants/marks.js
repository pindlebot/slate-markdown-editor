import React from 'react';

let styles = {
  code_block: {
    backgroundColor: '#fafafa',
    color: '#555'
  },
  code_line: {
    display: 'block'
  },
  title: {
    fontWeight: 'bold', 
    fontSize: '20px', 
    margin: '20px 0 10px 0', 
    display: 'inline-block'
  },
  list: {
    paddingLeft: '10px', 
    lineHeight: '10px'
  },
  hr: {
    borderBottom: '2px solid #000', 
    display: 'block', 
    opacity: 0.2
  },
  url: {
    opacity: 0.5, 
    color: 'blue'
  },
  image: {
    opacity: 0.5, 
    color: 'red'
  }
}

export default  {
  bold: props => <strong>{props.children}</strong>,
  code: props => <code>{props.children}</code>,
  italic: props => <em>{props.children}</em>,
  underline: props => <u>{children}</u>,
  title: props => <span style={styles.title}>{props.children}</span>,
  punctuation: props => <span style={{opacity: 0.2}}>{props.children}</span>,
  list: props => <span style={styles.list}>{props.children}</span>,
  hr: props => <span style={styles.hr}>{props.children}</span>,
  url: props => <span style={styles.url}>{props.children}</span>,
  image: props => <span style={styles.image}>{props.children}</span>,
}
