import * as React from 'react'
import { Editor } from 'slate-react'
import wrapped from './wrapped'
import EditorToolbar from './Toolbar'
import defaultProps from './props'
import curry from 'lodash.curry'
import onKeyDown from './handlers/onKeyDown'


class MarkdownEditor extends React.Component {

  render() {
    const {
      toolbar,
      ...rest
    } = this.props;
  
    return(
      <div>
      {toolbar && <EditorToolbar toolbar={toolbar} />}
      <Editor {...rest} onKeyDown={onKeyDown} />
     </div>
    )
  }
}

MarkdownEditor.defaultProps = defaultProps;

export default wrapped(MarkdownEditor)