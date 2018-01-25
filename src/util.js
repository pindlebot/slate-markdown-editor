import Plain from 'slate-plain-serializer'
import { Value, Node, Block, Text, Document } from './slate'
import serialize from './parser/serialize'
import deserialize from './parser/deserialize'

const value = require('./value.json')

export const deserializeJSON = json => json && typeof json === 'string' ? 
  Value.fromJSON(JSON.parse(json)) : Plain.deserialize('', { defaultBlock: 'paragraph' })

export const serializeValue = value => JSON.stringify(value.toJSON(), null, '\n')

export const saveValue = value => window.localStorage.setItem('value', serializeValue(value))

export const loadValue = () => deserializeJSON(window.localStorage.getItem('value'))

export const valueToContent = value => Plain.serialize(value)

exports.serialize = serialize;
exports.deserialize = deserialize;