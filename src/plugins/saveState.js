let debounce = require('lodash.debounce')

const save = (change) => {
  console.log('saving...')
  window.localStorage.setItem(
    '_slate_', 
    JSON.stringify(change.value.toJSON(), null, '\n')
  ) 

  return undefined
}

let debounced = debounce(save, 1000)

function onKeyDown(
  opts,
  event,
  change,
  editor,
) {
  const args = [opts, event, change, editor];

  return debounced(change)
} 

function core(opts = {}) {
  return {
    onKeyDown: onKeyDown.bind(null, opts)
  }
}

export default core;