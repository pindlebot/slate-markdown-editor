// @flow
import * as React from 'react'
import createComponent from './Component'

const styles = theme => ({
  root: {
    'list-style-type': 'none',
    margin: '0 0 0 20px',
    padding: 0
  }
})

export default createComponent(styles, { component: 'ul' })
