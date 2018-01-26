import React from "react";
import ReactDOM from "react-dom";
import { Editor, getEventTransfer } from "slate-react";
import INITIAL_VALUE from './value';
import * as plugins from './plugins'
import toggleCode from './plugins/toggleCode'
import renderNode from './render/renderNode'
import renderMark from './render/renderMark'
import injectSheet, { jss, ThemeProvider } from 'react-jss'
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

const isTab = isKeyHotkey('tab');
const isEnter = isKeyHotkey('enter');
const isBackspace = isKeyHotkey('backspace');

class MarkdownEditor extends React.Component {

  onPaste = (event, change) => {
    const transfer = getEventTransfer(event)
    
    console.log(transfer)

    const value = importMarkdown(transfer.text)
    const { document } = value;
    console.log('pasted', document.toJSON())
    
    //change.insertFragmentByKey(
    //  change.value.document.key,
    //  change.value.document.nodes.size,
    //  document
    //)

    change.insertFragment(document)

    console.log('pasted - result', change.value.toJSON())
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
      //.slice(0, startOffset)
      ///.replace(/\s*/g, '')

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

const wrapped = (Component) => {
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