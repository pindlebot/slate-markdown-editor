import * as React from 'react'
import { Editor } from 'slate-react'
import wrapped from './wrapped'
import EditorToolbar from './Toolbar'
import defaultProps from './props'
import curry from 'lodash.curry'

function MarkdownEditor (props) {
  const {
    toolbar,
    ...rest
  } = props;

  return(
    <div>
    {toolbar && <EditorToolbar toolbar={toolbar} />}
    <Editor {...rest} />
    </div>
  )
  
}

MarkdownEditor.defaultProps = defaultProps;

export default (context) => wrapped(context)(MarkdownEditor)