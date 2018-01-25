import Plain from 'slate-plain-serializer'
import { Value, Node, Block, Text, Document } from 'slate'
import initialValue from './value'

const { State } = require('../packages/markup-it')
const markdown = require('../packages/markup-it/lib/markdown')
const state = State.create(markdown)

export const importMarkdown = text => Value.fromJSON({ 
  document: state.deserializeToDocument(text) 
})

export const exportMarkdown = value => state.serializeDocument(value.document)

export const deserializeJSON = json => json && typeof json === 'string' ? 
  Value.fromJSON(JSON.parse(json)) : initialValue

export const serializeValue = value => JSON.stringify(value.toJSON(), null, '\n')

export const saveValue = value => window.localStorage.setItem('value', serializeValue(value))

export const loadValue = () => deserializeJSON(window.localStorage.getItem('value'))
