// @ts-check

import * as React from 'react'
import { Editor } from 'slate-react'
import wrapped from './wrapped'
import EditorToolbar from './Toolbar'
import defaultProps from './props'
import * as curry from 'lodash.curry'
import onKeyDown from './handlers/onKeyDown'

interface MarkdownEditorProps {
  value: any
  onChange: any
  toolbar: any,
  onKeyDown: any,
  style: any,
  onPaste: any,
  placeholder: any,
  renderNode: any,
  renderMark: any,
  plugins: any
}

const MarkdownEditor: React.SFC<MarkdownEditorProps> = (props) => {
  const {
    toolbar,
    ...rest
  } = props;

  let onKeyDownWithProps = curry(onKeyDown)(props)

  return (
    <div>
    {toolbar && <EditorToolbar toolbar={toolbar} />}
    <Editor {...rest} onKeyDown={onKeyDownWithProps} />
   </div>
  )
}

MarkdownEditor.defaultProps = defaultProps;

export default wrapped(MarkdownEditor)