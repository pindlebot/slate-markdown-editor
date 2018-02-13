import * as React from 'react'
import { Editor } from 'slate-react'
import wrapped from './wrapped'
import EditorToolbar from './Toolbar'
import defaultProps, { PRISM_CDN } from './props'
import * as constants from './constants'
import isUrl from 'is-url'

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

    if (!this.hasStylesheet(theme)) {
      this.addStylesheet(theme)
    }
  }

  hasStylesheet = (href) => Object.values(document.styleSheets)
    .some(sheet => sheet.href === href)

  addStylesheet = (href) => {
    var link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
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
