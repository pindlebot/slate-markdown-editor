import { Value, Node, Block, Text, Document } from 'slate'
import * as marked from 'marked'
import findIndex from 'lodash.findindex'

const text = string => ({
  object: 'text',
  leaves: string.split('\n').map(txt => ({
      object: 'leaf',
      text: txt,
      marks: []
    })
  )
})

const block = (type, data = {}) => ({
  ...Node.createProperties(type),
  object: 'block',
  isVoid: false,
  data: data,
})

const handleToken = (token) => {
  switch(token.type) {
    case 'code':
      let lines = ['```', ...token.text.split('\n'), '```']
  
      return {
        ...block('pre'),
        nodes: lines.map(txt => ({
          ...block('code', { wrapper: 'pre' }),
          nodes: [text(txt)]
        }))
      }    
      break;
    case 'heading':
      return {
        ...block('heading', { depth: token.depth, split: true }),
        nodes: [text(token.text)]
      }
      break
    case 'blockquote_start':
      return {
        ...block('blockquote', { split: true }),
        nodes: [text(token.text)]
      }
      break
    case 'paragraph':

    default: 
      return {
        ...block('p', {}),
        nodes: [text(token.text)]
      }
  }
}

const node = (tokens) => {
  let tmp = {};

  const findRecursive = (tmp, type) => {
    if(!type) return undefined
    if(tmp.type === type) return tmp.tokens;

    let { tokens } = tmp;
    if(Array.isArray(tokens)) {
      let token;
      let i = 0;

      while(i < tokens.length) {
        token = findRecursive(tokens[i], type)
        i++
      }
      return token;
    }

    return undefined
  }
  const last = (types) => types[types.length - 1]
 
  let types = []
  let tok = tokens.reduce((acc, val) => {  

    if(val.type.indexOf('start') > -1) {
      let type = val.type.replace('_start', '')
      types.push(type)

      let tokens = { type, tokens: [] }
      
      if(tmp.tokens) tmp.tokens.push(tokens)
      else tmp = tokens;
      
      return acc;
    }

    if(val.type.indexOf('end') > -1) {
      type = undefined;
    }

    let nested = findRecursive(tmp, type);
    console.log('nested',nested)
    if(nested) {
      nested.push(val)
      return acc;
    }

    acc.push(val)
    return acc;
  }, [])
  console.log('tmp', tmp)
  console.log('tok', tok)
  return []
}
 

const createValue = (tokens) => ({
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: node(tokens)
  }
})

export default function fromMarkdown (content) {
  const lexer = new marked.Lexer();
  let tokens = lexer.lex(content)  
  console.log(tokens)
  let value = createValue(tokens)
  return value;
}
