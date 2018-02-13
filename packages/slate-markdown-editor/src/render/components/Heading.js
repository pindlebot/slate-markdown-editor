// @flow
import * as React from 'react'
import defaultStyles from '../../styles/defaultStyles'
import * as colors from '../../styles/dark'
import Component from './Component'

const Heading = (depth: *) => {
  return (props: *) => {
    let { parent } = props
    let tagName = 'h' + depth
    let content = '#'.repeat(depth) + ' '

    let styles : any = {
      root: {
        ...defaultStyles,
        display: parent.get('type') === 'list_item'
          ? 'inline-block' : 'block',
        '&:before': {
          content: `"${content}"`,
          color: colors.yellow
        }
      }
    }

    if (parent.get('type') === 'list_item') {
      styles.root.marginTop = 0
    }

    return Component({
      tagName,
      styles,
      ...props
    })
  }
}

export default Heading
