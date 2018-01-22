const { State } = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const state = State.create(markdown);
const document = state.deserializeToDocument('\nOK\n## OK2\n');
let json = document.toJSON()
console.log(JSON.stringify(json))