
import Plain from 'slate-plain-serializer'
import { Editor, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'
import injectSheet, { jss, ThemeProvider } from 'react-jss'
import React from 'react'
import Heading from './components/Heading'
import Blockquote from './components/Blockquote'
import Code from './components/Code'
import UnorderedList from './components/UnorderedList'
import ListItem from './components/ListItem'
import Pre from './components/Pre'
import inline from './inline'
import marks from './constants/marks'
import decorateNode from './decorateNode';
import schema from './constants/schema'
import fromMarkdown from './parser/fromMarkdown'

const blocks = {
  pre: Pre,
  ul: UnorderedList,
  li: ListItem,
  code: Code,
  heading: Heading,
  blockquote: Blockquote
}

class SlateMarkdownEditor extends React.Component {

  renderMark = (props) => {
    const { children, mark } = props

    if(marks[mark.type]) {
      return marks[mark.type](props)
    }
  }

  onPaste = (event, change) => {
    const transfer = getEventTransfer(event)
    const json = fromMarkdown(transfer.text)
    const { document } = Value.fromJSON(json)
    console.log(document.toJSON())
    
    change.insertFragment(document)
    return true
  }

  parent = value => value.document.getParent(value.startBlock.key)

  closest = value => value.document.getClosestBlock(value.startBlock.key)

  depth = value => value.document.getDepth(value.startBlock.key)

  insertCodeBlock = (event, change) => {
    let { data, type } = schema.code;
    
    let startBlock = change.value.startBlock;

    let lang = startBlock.text.replace('```', '').trim()
    event.preventDefault()      
    
    change
      .extendToStartOf(startBlock)  
      .delete() 

    change       
      .setBlock({type, data})
      .wrapBlock({type: 'pre', data: { lang }})

    return true
  }

  unwrapCodeBlock = change => {
    let { startBlock, blocks } = change.value
    if(!/``[\s\S]+/g.test(startBlock.text)) return
    if(!blocks.some(block => block.type == 'code')) return

    change
      .splitBlock()
      .setBlock('p')
      .unwrapBlock('pre')       
      .removeNodeByKey(startBlock.key)
      
    return true;
  }

  wrap = (event, change, { data, type }) => {
    let startBlock = change.value.startBlock;
    if(startBlock.type === type) return
    
    event.preventDefault()
  
    if(data.inner) {
      change
        .setBlock(data.inner)
        .wrapBlock({type, data})
    } else {
      change
        .setBlock({type, data})
    }

    if(data.wrapper) change.wrapBlock(data.wrapper)  

    return true;
  }

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value
    
    const chars = startBlock.text
      .slice(0, startOffset)
      .replace(/\s*/g, '')

    const elem = this.getType(chars)

    if (!elem) return
    if(elem === 'p') return;
    let { data, type } = schema[elem]
    event.preventDefault()      
    
    if(type === 'code') return this.insertCodeBlock(event, change)
    
    change
      .extendToStartOf(startBlock)  
      .delete() 

    if(data.wrapper || data.inner) return this.wrap(event, change, { data, type })
     
    change
      .setBlock({type, data})

    if(
      type !== startBlock.type && 
      startBlock.type !== 'p'
    ) change.wrapBlock(startBlock.type)

    return true;
  }


  getType = chars => {    
    switch (true) {
      case chars === '*':
      case chars === '-':
      case chars === '+': return 'li'
      case chars === '>': return 'blockquote'
      case chars.indexOf('#') > -1: return 'h' + chars.length
      case /```.+?/.test(chars): return 'code'
      default: return null
    }
  }

  onBackspace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    if (value.startOffset != 0) return

    const { startBlock } = value

    let depth = this.depth(value)
    let parent = this.parent(value)
    let { size } = parent.nodes

    if (startBlock.type == 'p' && depth <= 1) return
    if (startBlock.type == 'code' && size > 1) return

    let data = startBlock.data.toJSON()

    event.preventDefault()
    change.setBlock('p')
    if(depth > 1) change.unwrapBlock(parent)

    return true
  }

  onEnter = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    const { startBlock, startOffset, endOffset } = value
    let parent = this.parent(change.value);

    if (startBlock.type == 'code') return this.unwrapCodeBlock(change)

    if (
      startOffset == 0 && 
      startBlock.text.length == 0
    ) return this.onBackspace(event, change)
  
    if (endOffset != startBlock.text.length) return
  
    let data = startBlock.data.toJSON()
  
    if(!data.split) return

    event.preventDefault()
    change.splitBlock().setBlock('p')
  
    return true
  }

  onKeyDown = (event, change) => {
    //console.log('startBlock', change.value.startBlock.toJSON())
    //console.log('parent', this.parent(change.value).toJSON())
    //console.log('depth', this.depth(change.value))
    switch (event.key) {

      case ' ': return this.onSpace(event, change)
      case 'Backspace': return this.onBackspace(event, change)
      case 'Enter': return this.onEnter(event, change)
    }
  }

  renderNode = (props) => {
    const { attributes, children, node } = props
    
    if(blocks[node.type]) {
      return blocks[node.type](props)
    } else {
      return React.createElement(node.type, {}, children)
    }
  }

  render() {
    const {
      value,
      onChange,
      placeholder,
      ...rest
    } = this.props;
    
    return (
      <Editor
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        renderMark={this.renderMark}
        renderNode={this.renderNode}
        decorateNode={decorateNode}
        onKeyDown={this.onKeyDown}
        style={{
          fontFamily: '"Open Sans'
        }}
        onPaste={this.onPaste}
        {...rest}
      />
    )
  }
}

SlateMarkdownEditor.defaultProps = {
  placeholder: 'What are you thinking? 🤔',
  value: Plain.deserialize('')
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
export default wrapped(SlateMarkdownEditor)
