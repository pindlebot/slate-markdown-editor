import Plain from 'slate-plain-serializer'
import { Value, Node, Block, Text, Document } from 'slate'
import * as marked from 'marked'

export const deserializeJSON = json => json && typeof json === 'string' ? 
  Value.fromJSON(JSON.parse(json)) : Plain.deserialize('', { defaultBlock: 'div' })

export const serializeValue = value => JSON.stringify(value.toJSON())

export const saveValue = value => window.localStorage.setItem('value', serializeValue(value))

export const loadValue = () => deserializeJSON(window.localStorage.getItem('value'))

export const valueToContent = value => Plain.serialize(value)

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

const node = (token) => {
  console.log(token)
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
    case 'blockquote':
      return {
        ...block('blockquote', { split: true }),
        nodes: [text(token.text)]
      }
    case 'paragraph':

    default: 
      return {
        ...block('div', {}),
        nodes: [text(token.text)]
      }
  }
}
 

const createValue = (tokens) => ({
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: tokens.map(tok => node(tok))
  }
})

export function contentToJSON (content) {
  const lexer = new marked.Lexer();
  let tokens = lexer.lex(content)  
  let value = createValue(tokens)
  return value;
}