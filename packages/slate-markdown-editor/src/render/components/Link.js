// @flow
import * as React from 'react'
import injectSheet from 'react-jss'
import createComponent from './Component'

const styles = theme => ({
  root: {
    color: theme.colors.blue
  } 
})

function Link (props: *) {
  const href = props.node.data.get('href', '')
  const title = props.node.data.get('title', '')
  const Component = createComponent(styles, { component: 'a' }) 

  return <Component {...props} title={title} href={href} />
}

export default Link
