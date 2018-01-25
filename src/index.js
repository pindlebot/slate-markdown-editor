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

  WrapInBlockquote = (event, change) => {
    event.preventDefault()     
    change.call(this.clear)      

    this.props.onChange(
      plugins.editBlockquote.changes.wrapInBlockquote(change)
    )

    return true
  }

  wrapInList = (type) => {
    return (event, change) => {
      event.preventDefault()     
      change.call(this.clear)      

      this.props.onChange(
        plugins.editList.changes.wrapInList(
          change,
          type
        )
      )

      return true;
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

    switch (true) {
      case /[*+-]/.test(chars):
        return this.wrapInList('unordered_list')(event, change)
      case /\d\./.test(chars):
        return this.wrapInList('ordered_list')(event, change)
      case />/.test(chars): 
        return this.WrapInBlockquote(event, change)
      default: 
        return 
    } 
  }

  onEnter = (event, change) => {
    if(/\s*`{3}.*/.test(change.value.startBlock.text)) {
      return toggleCode(event, change, this.props.onChange)
    }    

    let parent = change.value.document.getParent(change.value.startBlock.key)
    let sibling = parent.getPreviousSibling(change.value.startBlock.key)

    if(sibling) {
      let { text } = sibling
      if(!text && !change.value.startBlock.text) {
        event.preventDefault()   
        change.call(this.clear)  
        return toggleCode(event, change, this.props.onChange)
      } 
    }
    
    return
  }


  onKeyDown = (event, change) => {
    let { key } = event;
    if(key === ' ') return this.onSpace(event, change)
    if(key === 'Enter') return this.onEnter(event, change)
   
    return
  }

  render() {
    const { value } = this.props;
    const inBlockquote = plugins.editBlockquote.utils.isSelectionInBlockquote(value);

    return (
      <Editor
        placeholder={"Enter some text..."}
        plugins={slatePlugins}
        value={this.props.value}
        onChange={this.props.onChange}
        renderNode={renderNode}
        renderMark={renderMark}  
        onKeyDown={this.onKeyDown}
      />
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