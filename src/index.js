import React from "react";
import ReactDOM from "react-dom";
import { Editor } from "slate-react";
import INITIAL_VALUE from './value';
import * as plugins from './plugins'
import toggleCode from './plugins/toggleCode'
import renderNode from './render/renderNode'
import renderMark from './render/renderMark'
import injectSheet, { jss, ThemeProvider } from 'react-jss'

const slatePlugins = [
  plugins.editCode,
  plugins.editBlockquote,
  plugins.editList,
  plugins.prism,
  plugins.heading,
  plugins.inlineMarkdown
]

class MarkdownEditor extends React.Component {

  onWrapInBlockquote = (event, change) => {
    event.preventDefault()     
    change.call(this.clear)      

    this.props.onChange(
      plugins.editBlockquote.changes.wrapInBlockquote(change)
    )

    return true
  }

  onUnwrapBlockquote = (event, change) => {
    event.preventDefault()     
    change.call(this.clear)      
    
    this.props.onChange(
      plugins.editBlockquote.changes.unwrapBlockquote(
        change   
      )
    )

    return true
  }

  wrapInList = (event, change) => {
    event.preventDefault()     
    change.call(this.clear)      

    this.props.onChange(
      plugins.editList.changes.wrapInList(
        change,
        //chars === '-'
      )
    )

    return true;
  }

  handleType = (chars, event, change) => {   
    switch (true) {
      case chars === '*':
      case chars === '-':
      case chars === '+': 
        return this.wrapInList(event, change)
      case chars === '>': 
        return this.onWrapInBlockquote(event, change)
      default: 
        return 
        //return handleMarks(event, change)
    }
  }

  clear = change => {
    change
    .extendToStartOf(change.value.startBlock)  
    .delete() 
  }

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value

    const chars = startBlock.text
      .slice(0, startOffset)
      .replace(/\s*/g, '')

    return this.handleType(chars, event, change)    
  }


  onKeyDown = (event, change) => {
    let { key } = event;
    if(key === ' ') return this.onSpace(event, change)

    if(
      key === 'Enter' && 
      /\s*`{3}.*/.test(change.value.startBlock.text)
    ) {
      event.preventDefault()   
      change.call(this.clear)  
      return toggleCode(event, change, this.props.onChange)
    }
    return
  }

  render() {
    const { value } = this.props;
    const inBlockquote = plugins.editBlockquote.utils.isSelectionInBlockquote(value);

    return (
      <div>
        <div>
          <button onClick={this.onWrapInBlockquote}>Blockquote</button>
          <button onClick={this.onUnwrapBlockquote} disabled={!inBlockquote}>
            Unwrap
          </button>
          <button onClick={this.onToggleCode}>
          {plugins.editCode.utils.isInCodeBlock(value)
              ? 'Paragraph'
              : 'Code Block'}
          </button>
          <button onClick={this.wrapInList}>Wrap in List</button>
        </div>
        <Editor
          placeholder={"Enter some text..."}
          plugins={slatePlugins}
          value={this.props.value}
          onChange={this.props.onChange}
          renderNode={renderNode}
          renderMark={renderMark}
          
          onKeyDown={this.onKeyDown}
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