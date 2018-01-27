// @flow
import { Value } from 'slate'
import * as options from './plugins/options'

const { State } = require('@menubar/markup-it')
const markdown = require('@menubar/markup-it/lib/markdown')
const state = State.create(markdown)

declare var window: any;

export function fromMarkdown (md) {
  return Value.fromJSON({ 
    document: state.deserializeToDocument(md) 
  })
}

export function toMarkdown (value) {
  return state.serializeDocument(value.document)
}

export function deserializeJSON (json) {
  return json && typeof json === 'string' ? 
    Value.fromJSON(JSON.parse(json)) : {}
}

export function serializeValue (value) {
  return JSON.stringify(value.toJSON(), null, '\n')
}

export function saveValue (value) {
  return window.localStorage.setItem(
    'value', serializeValue(value)
  )
}

export function loadValue (key = options.LOCAL_STORAGE_KEY) {
  return deserializeJSON(
    window.localStorage.getItem(
      key
    )
  )
}

export function getDepth (change) {
  return change.value.document
    .getDepth(change.value.startBlock.key)
}

export const getClosest = change => change.value.document
  .getClosestBlock(change.value.startBlock.key)

export const getParent = change => change.value.document
  .getParent(change.value.startBlock.key)

export const getPrevious = change => getParent(change)
  .getPreviousSibling(change.value.startBlock.key)

export const clear = change => {
  change
  .extendToStartOf(change.value.startBlock)  
  .delete() 
}