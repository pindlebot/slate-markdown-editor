import tokenize from './tokenize'
import React from 'react'

export default (node) => {
  if (node.object != 'block') return

  const string = node.text
  const texts = node.getTexts().toArray()
  let tokens = tokenize(string)
  tokens = tokens.filter(tok => tok.content)
  //if(!tokens.length) return []

  const decorations = []
  let startText = texts.shift()
  let endText = startText
  let startOffset = 0
  let endOffset = 0
  let start = 0

  function getLength(token) {
    if (typeof token == 'string') {
      return token.length
    } else if (typeof token.content == 'string') {
      return token.content.length
    } else {
      return token.content.reduce((l, t) => l + getLength(t), 0)
    }
  }

  for (const token of tokens) {
    startText = endText
    startOffset = endOffset

    const length = getLength(token)
    const end = start + length

    let available = startText.text.length - startOffset
    let remaining = length

    endOffset = startOffset + remaining

    while (endText && available < remaining) {
      endText = texts.shift()
      remaining = length - available
      available = endText.text.length
      endOffset = remaining
    }

    if (typeof token != 'string') {
      const range = {
        anchorKey: startText.key,
        anchorOffset: startOffset,
        focusKey: endText.key,
        focusOffset: endOffset,
        marks: [{ type: token.type }],
      }

      decorations.push(range)
    }

    start = end
  }

  return decorations
}