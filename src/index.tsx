import * as React from "react";
import * as ReactDOM from "react-dom";
import { Editor, getEventTransfer } from "slate-react";
import * as plugins from './plugins'
import toggleCode from './toggleCode'
import renderNode from './render/renderNode'
import renderMark from './render/renderMark'
import PropTypes from 'prop-types'
import * as reactJss from 'react-jss'
import injectSheet from 'react-jss'
const { jss, ThemeProvider } = require('react-jss')

import { 
  getDepth,
  getClosest,
  getPrevious,
  clear,
  importMarkdown,
  exportMarkdown
} from './util'
import Toolbar from './Toolbar'

const slatePlugins = [
  plugins.editCode,
  plugins.editBlockquote,
  plugins.editList,
  plugins.prism,
  plugins.heading,
  plugins.inlineMarkdown,
  plugins.saveState,
  plugins.noEmpty
]

import { isKeyHotkey } from 'is-hotkey';

const isTab : any = isKeyHotkey('tab');
const isEnter : any = isKeyHotkey('enter');
const isBackspace : any = isKeyHotkey('backspace');

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

  WrapInBlockquote = (event, change) => {
    event.preventDefault()     
    change.call(clear)      

    this.props.onChange(
      plugins.editBlockquote.changes.wrapInBlockquote(change)
    )

    return true
  }

  wrapInList = (type) => {
    return (event, change) => {
      event.preventDefault()     
      change.call(clear)      

      this.props.onChange(
        plugins.editList.changes.wrapInList(
          change,
          type
        ).focus()
      )

      return true;
    }
  }

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value

    const chars = startBlock.text
     
    switch (true) {
      case /^\s*[*+-]\s*$/.test(chars):
        return this.wrapInList('unordered_list')(event, change)
      case /^\s*\d\.\s*$/.test(chars):
        return this.wrapInList('ordered_list')(event, change)
      case /^\s*>\s*$/.test(chars): 
        return this.WrapInBlockquote(event, change)
      default: 
        return 
    } 
  }

  onEnter = (event, change) => {
    if(/\s*`{3}.*/.test(change.value.startBlock.text)) {
      return toggleCode(event, change, this.props.onChange)
    }    

    let prev = getPrevious(change)

    if(
      prev && 
      prev.type == 'code_line' &&       
      !prev.text &&
      !change.value.startBlock.text
    ) {
      event.preventDefault()   
      change.call(clear)  
      return toggleCode(event, change, this.props.onChange)
    }
    
    return
  }
  
  onKeyDown = (event, change) => {
    if(event.key == ' ') return this.onSpace(event, change)
    if(isEnter(event)) return this.onEnter(event, change)
    if(isTab(event)) {
      event.preventDefault();
      event.stopPropagation();
      
      if(getDepth(change) <= 1) {
        return toggleCode(event, change, this.props.onChange)
      }
    }
    return
  }

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