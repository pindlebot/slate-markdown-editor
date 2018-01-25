const { State } = require('../../packages/markup-it');
const markdown = require('../../packages/markup-it/lib/markdown');

const state = State.create(markdown)
export default document => state.serializeDocument(document)
