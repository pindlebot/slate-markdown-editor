import * as React from 'react'
import { Editor } from 'slate-react'
import wrapped from './wrapped'
import EditorToolbar from './Toolbar'
import defaultProps, { PRISM_CDN } from './props'
import * as constants from './constants'
import isUrl from 'is-url'
import append from 'append-stylesheet'

class MarkdownEditor extends React.Component {
  componentDidMount () {
    let { theme } = this.props.prism
    if (!isUrl(theme)) {
      theme = PRISM_CDN + 'prismjs@' +
        constants.prism +
        '/themes/prism-' +
        theme +
        '.css'
    }

    append(theme)
  }

  render () {
    const {
      toolbar,
      ...rest
    } = this.props
    return (
      <div>
        {toolbar && <EditorToolbar toolbar={toolbar} />}
        <Editor {...rest} />
      </div>
    )
  }
}

MarkdownEditor.defaultProps = defaultProps

export default wrapped(MarkdownEditor)
