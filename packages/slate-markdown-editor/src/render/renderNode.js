// @flow
import * as React from 'react'
import { getAttributes } from '../plugins/main/helpers'
import * as url from 'url'

function renderNode (props: *) {
  const { node, editor: { props: { components } } } = props

  const json = node.toJSON()
  if (components[node.type]) {
    let type = node.type

    if (
      node.type === 'html' &&
      json.data.closingTag === '</script>'
    ) {
      let attributes = getAttributes(node.data.toJSON())
      if (attributes.src) {
        props.script = attributes

        const { host } = url.parse(attributes.src)
        if (host === 'gist.github.com') {
          type = 'gist'
        } else {
          type = 'script'
        }
      }
    }
    const BlockComponent = components[type]

    return <BlockComponent {...props} />
  } else {
    console.warn(`"${node.type}" block type not found.`)
  }

  return null
}

export default renderNode
