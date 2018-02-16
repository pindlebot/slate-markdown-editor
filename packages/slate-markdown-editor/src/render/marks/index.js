import * as React from 'react'

export default {
  strong: props => <strong>{props.children}</strong>,
  em: props => <em>{props.children}</em>,
  text: props => <span>{props.children}</span>,
  code: props => <code>{props.children}</code>
  // CODE: props => <code>{props.children}</code>,
  // 'prism-token': props => {
  //  console.log(props)
  //  return (<span className='prism-token'>{props.children}</span>)
  // }
}
