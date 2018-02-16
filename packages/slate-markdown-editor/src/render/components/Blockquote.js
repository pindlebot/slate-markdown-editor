// @flow
import * as React from 'react'
import createComponent from './Component'

const styles = theme => ({
  root: {
    margin: '0 0 0 10px',
    padding: '0 0 0 10px',
    borderLeft: '2px solid ' + theme.colors.cyan,
    backgroundColor: theme.colors.lightBlack
  }
})

const Blockquote = createComponent(styles, { component: 'blockquote' })

export default Blockquote
