// @flow
import { Value, type Change } from 'slate'
import * as options from './plugins/options'

const { State } = require('@menubar/markup-it')
const markdown = require('@menubar/markup-it/lib/markdown')
const state = State.create(markdown)

declare var window: any;

export function fromMarkdown (md: string) {
  return Value.fromJSON({ 
    document: state.deserializeToDocument(md) 
  })
}

export function toMarkdown (value: Value) {
  return state.serializeDocument(value.document)
}

export function deserializeJSON (json: string) {
  return json && typeof json === 'string' ? 
    Value.fromJSON(JSON.parse(json)) : {}
}

export function serializeValue (value: Value) {
  return JSON.stringify(value.toJSON(), null, '\n')
}

export function saveValue (value: Value) {
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

export function getDepth (change: Change) {
  return change.value.document
    .getDepth(change.value.startBlock.key)
}

export function getClosest (change: Change) {
  return change.value.document
    .getClosestBlock(change.value.startBlock.key)
}

export function getParent (change: Change) {
  return change.value.document
    .getParent(change.value.startBlock.key)
}

export function getPrevious (change: Change) {
  getParent(change)
  .getPreviousSibling(change.value.startBlock.key)
}

export function clear (change: Change) {
  change
  .extendToStartOf(change.value.startBlock)  
  .delete() 
}