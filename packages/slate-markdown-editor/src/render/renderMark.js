// @flow
import * as React from 'react'

function renderMark (props: *) {
  let marks = {
    strong: props => <strong>{props.children}</strong>,
    em: props => <em>{props.children}</em>,
    text: props => <span>{props.children}</span>,
    code: props => <code>{props.children}</code>,
    link: props => (
      <a
        style={{color: 'blue'}}
        href={props.mark.data.get('link')}
      >
        {props.children}
      </a>
    )
  }

  let mark = marks[props.mark.type]

  if (mark) return mark(props)

  return null
}

export default renderMark
