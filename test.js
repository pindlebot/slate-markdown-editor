
const { State } = require('@menubar/markup-it')
const markdown = require('@menubar/markup-it/lib/markdown')
//const deserializer = require('@menubar/markup-it/src/models/deserializer.js')
let md = '**bold**'
const state = State.create(markdown)
let document = state.deserialize(md) 
console.log(document.toJSON()[0].nodes[0])