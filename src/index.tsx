import * as React from "react";
import { Editor, getEventTransfer } from "slate-react";
import slatePlugins, * as plugins from './plugins'
import renderNode from './render/renderNode'
import renderMark from './render/renderMark'
import PropTypes from 'prop-types'
import injectSheet, * as reactJss from 'react-jss'
import onKeyDown from './handlers/onKeydown'

import { 
  importMarkdown,
} from './util'
import Toolbar from './Toolbar'

interface MarkdownEditorProps {
  value: any
  onChange: any
  toolbar: any
}

class MarkdownEditor extends React.Component<MarkdownEditorProps> {
  onPaste = (event, change) => {
    const transfer = getEventTransfer(event)
    const value = importMarkdown(transfer.text)
    const { document } = value;
    change.insertFragment(document)
    return true
  }

  onKeyDown = (event, change) => onKeyDown({ 
    onChange: this.props.onChange
  }, event, change)

  render() {
    const { value } = this.props;
    return (
      <div>
        <Toolbar toolbar={this.props.toolbar} />
        <Editor
          placeholder={"Enter some text..."}
          plugins={slatePlugins}
          value={this.props.value}
          onChange={this.props.onChange}
          renderNode={renderNode}
          renderMark={renderMark}  
          onKeyDown={this.onKeyDown}
          onPaste={this.onPaste}
          autoFocus={true}
        />
      </div>
    );
  }
}

const theme = {
  backgroundColor: '#fafafa',
  fontFamily: '"Open Sans"'
}

const { ThemeProvider } = reactJss;

const wrapped : any = (Component) => {
  class Wrapped extends React.Component {
    render() {
      return(
        <ThemeProvider theme={theme}>
          <Component {...this.props} />
        </ThemeProvider>
      )
    }
  } 
  return Wrapped
}

export default wrapped(MarkdownEditor)