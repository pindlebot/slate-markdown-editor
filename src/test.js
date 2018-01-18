const { Value, Node, Block, Text, Document, Character } = require('slate')

const createTextNode = text => ({
  object: 'text',
  leaves: text.split('\n').map(txt => ({
      object: 'leaf',
      text: txt,
      marks: []
    })
  )
})

const block = type => ({
  ...Node.createProperties(type),
  object: 'block',
  isVoid: false,
  data: {},
})

const createBlocks = (token) => {
  switch(token.type) {
    case 'code':
      return {
        ...block('code_block'),
        nodes: token.text.split('\n').map(txt => ({
          ...block('code_line'),
          nodes: [createTextNode(txt)]
        }))
      }    
      break;
    default: 
      return {
        ...block(token.type),
        nodes: [createTextNode(token.text)]
      }
  }
}
 

const createValue = (tokens) => ({
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: tokens.map(token => 
      createBlocks(token)
    )
  }
})
  
let out = createValue(
  [{text: 'lorem\nipsum', type: 'code'}]
)
let value = Value.fromJSON(out)
console.log(JSON.stringify(value.toJSON()))
