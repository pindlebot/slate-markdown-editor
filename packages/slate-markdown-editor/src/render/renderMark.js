// @flow
import * as React from 'react'
//import marks from './marks'

function renderMark (props: *) {
  const { editor: { props: { marks } } } = props

  let mark = marks[props.mark.type]

  if (mark) {
    return mark(props)
  } else {
    console.warn(`Mark named "${props.mark.type}" not found!`)
  }

  return null
}

export default renderMark
