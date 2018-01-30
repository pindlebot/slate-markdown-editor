// @flow
import { Value, type Change, type Editor } from 'slate'
import fromPairs from 'lodash.frompairs'
const { State } = require('@menubar/markup-it')
const markdown = require('@menubar/markup-it/lib/markdown')
const state = State.create(markdown)

declare var window: any;

export function getPlugin (editor: Editor, name: string) {
  return editor.props.plugins.find(plugin => 
    plugin.name === name
  )
}

export function fromMarkdown (md: string) {
  let document = state.deserializeToDocument(md) 
  return Value.create({ 
    document: document.toJSON()
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

export function loadValue (key: any) {
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

export function getAttributes(props: { openingTag: string }) {
  let re = /(?:<\w+\s+)(.+)(?:>)/
  let [tag, attributes] = re.exec(props.openingTag);
  
  attributes = attributes.split(/\s+/)
    .map(attrib => attrib.replace(/["']/g, ''))
    .map(attrib => [
      attrib.split('=')[0],
      attrib.split('=')[1] ? attrib.split('=')[1] : true
    ])
  
  attributes = fromPairs(attributes)
  console.log('attributes', attributes)
  return attributes;
}

export function log(...args: *) {
  let isDev = process.env.NODE_ENV !== 'production';
  let shouldLog = process.env.DEBUG && isDev

  if(shouldLog) {
    console.log(...args)
  }
}