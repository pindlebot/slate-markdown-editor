const { State } = require('markup-it');
const markdown = require('markup-it/lib/markdown');

const state = State.create(markdown);
export default text => state.deserializeToDocument(text)
