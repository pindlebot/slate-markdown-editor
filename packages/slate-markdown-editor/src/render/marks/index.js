import * as React from 'react'

export default {
  strong: props => <strong>{props.children}</strong>,
  em: props => <em>{props.children}</em>,
  text: props => <span>{props.children}</span>,
  code: props => <code>{props.children}</code>
}
