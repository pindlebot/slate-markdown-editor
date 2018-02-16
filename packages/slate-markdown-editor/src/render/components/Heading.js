import * as React from 'react'
import createComponent from './Component'

function Heading (depth) {
  return (props) => {
    const parentIsListItem = props.parent.get('type') === 'list_item'
    const name = 'h' + depth
    const content = '#'.repeat(depth) + ' '

    const styles = theme => ({
      root: {
        marginTop: parentIsListItem
          ? 0 : 'inherit',
        display: parentIsListItem
          ? 'inline-block' : 'block',
        '&:before': {
          content: `"${content}"`,
          color: theme.palette.secondaryTextColor
        }
      }
    })

    const Component = createComponent(styles)(name)
    return <Component {...props} />
  }
}

export default Heading
