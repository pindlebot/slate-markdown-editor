import React from 'react'

function renderMark(props) {
  switch(props.mark.type) {
    case 'strong': 
      return <strong>{props.children}</strong>
    case 'em': 
      return <em>{props.children}</em>
    case 'link':
      let link = props.mark.data.get('link')
      return <a href={link} style={{color: 'blue'}}>{props.children}</a>
    case 'text':
      return <span>{props.children}</span>
    default:
      return null
  }
}

export default renderMark;