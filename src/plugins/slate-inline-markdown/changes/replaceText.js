import curry from 'lodash.curry'

function replaceText (token, change) {
  change
    .extend(-1 * token.input.length)
    .delete()
    .insertText(token.text)
    .extend(-1 * token.text.length)
}

export default curry(replaceText)