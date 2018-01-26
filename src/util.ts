import Plain from 'slate-plain-serializer'
import { Value, Node, Block, Text, Document } from 'slate'

const { State } = require('../packages/markup-it')
const markdown = require('../packages/markup-it/lib/markdown')
const state = State.create(markdown)

declare var window: any;

export const importMarkdown = text => Value.fromJSON({ 
  document: state.deserializeToDocument(text) 
})

export const exportMarkdown = value => state.serializeDocument(value.document)

export const deserializeJSON = json => json && typeof json === 'string' ? 
  Value.fromJSON(JSON.parse(json)) : {}

export const serializeValue = value => JSON.stringify(value.toJSON(), null, '\n')

export const saveValue = value => window.localStorage.setItem('value', serializeValue(value))

export const loadValue = () => deserializeJSON(window.localStorage.getItem('value'))

export const getDepth = change => change.value.document.getDepth(change.value.startBlock.key)

export const getClosest = change => change.value.document
  .getClosestBlock(change.value.startBlock.key)

export const getParent = change => change.value.document.getParent(change.value.startBlock.key)

export const getPrevious = change => getParent(change)
  .getPreviousSibling(change.value.startBlock.key)

export const clear = change => {
  change
  .extendToStartOf(change.value.startBlock)  
  .delete() 
}