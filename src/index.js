
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'
import injectSheet, { jss, ThemeProvider } from 'react-jss'
import React from 'react'
import Heading from './components/Heading'
import Blockquote from './components/Blockquote'
import Code from './components/Code'
import UnorderedList from './components/UnorderedList'
import ListItem from './components/ListItem'
import * as marked from 'marked'
import inline from './inline'
import marks from './constants/marks'
import decorateNode from './decorateNode';
import schema from './constants/schema'
const pre = {
  backgroundColor: '#fafafa',
  color: '#555'
};

const blocks = {
  pre: props => (
    <div>
      <span style={{float: 'right'}}>lang: {props.node.data.toJSON().lang}</span>
      <pre {...props.attributes} style={pre}>
        {props.children}
      </pre>
    </div>
  ),
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

  createBlock = ({type = 'div', data = {}, text = '', marks = []}) => ({ 
    isVoid: false,      
    type: type,
    data: data,
    nodes: [{
      object: 'text',
      leaves: [{
        object: 'leaf',
        text: text,
        marks: marks
      }]
    }]
  })

  parent = value => value.document.getParent(value.startBlock.key)

  closest = value => value.document.getClosestBlock(value.startBlock.key)

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
    const { type, data } = this.getType(chars)

    if (!type) return

    if(type === 'p') return;
    if(type !== 'code') {
      console.log('change.extendToStartOf(startBlock)')
      change.extendToStartOf(startBlock)
    } else {
      event.preventDefault()      
      let txt = startBlock.text.replace('```', '')
      console.log('txt',txt)

      change       
        .removeNodeByKey(startBlock.key)
        .insertBlock({type, data})
        .wrapBlock({type: data.wrapper, data: { lang: txt }})

      return true
    }

    if(data.wrapper) {
      if(startBlock.type === type) return
      //if(type !== 'li') event.preventDefault()
      event.preventDefault()

      change
        .setBlock({type, data})
        .wrapBlock(data.wrapper)

      return true;
    }
    
    change
      .insertBlock({type, data})

    return true;
  }


  getType = (chars) => {
    switch (true) {
      case chars === '*':
      case chars === '-':
      case chars === '+': return schema.li
      case chars === '>': return schema.blockquote
      case chars.indexOf('#') > -1: {
        return schema['h' + chars.length]
      }
      case /```.+?/.test(chars): return schema.code
      default: return { type: null }
    }
  }

  onBackspace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    if (value.startOffset != 0) return

    const { startBlock } = value
    let size = this.parent(value).nodes.size

    if (startBlock.type == 'p') return
    if (startBlock.type == 'code' && size > 1) return

    let data = startBlock.data.toJSON()

    event.preventDefault()
    change.setBlock('p')
    
    if(data.wrapper) change.unwrapBlock(data.wrapper)

    return true
  }

  onEnter = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    const { startBlock, startOffset, endOffset } = value

    let isCode = change.value.blocks.some(block => block.type == 'code')
    
    if (
      startBlock.type == 'code' && 
      /``[\s\S]+/g.test(startBlock.text) &&
      isCode
    ) {

      change
        .setBlock('p')
        .unwrapBlock('pre')        
        .splitBlock()
        .removeNodeByKey(startBlock.key)

      return true;
    }

    if (startBlock.type == 'code') return
    if (startOffset == 0 && startBlock.text.length == 0) return this.onBackspace(event, change)
    if (endOffset != startBlock.text.length) return
    
    let data = startBlock.data.toJSON()
  
    if(!data.split) return
    
    event.preventDefault()
    change.splitBlock().setBlock('p')
    return true
  }

  onKeyDown = (event, change) => {
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
