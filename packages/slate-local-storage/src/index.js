let debounce = require('lodash.debounce')

export const save = (change, opts) => {
  window.localStorage.setItem(
    opts.key,
    JSON.stringify(change.value.toJSON())
  )

  opts.callback()

  return undefined
}

export function onKeyDown (
  opts,
  debounced,
  event,
  change,
  editor
) {
  return debounced(change, opts)
}

export const defaultOpts = {
  key: '_slate_',
  interval: 5000,
  callback: () => {
    console.log('Saved state 🙌')
  }
}

export const load = (opts) => () => JSON.parse(
  window.localStorage.getItem(opts.key)
)

function plugin (opts = defaultOpts) {
  let debounced = debounce(save, opts.interval)

  return {
    onKeyDown: onKeyDown.bind(null, opts, debounced),
    load: load(opts)
  }
}

export default plugin
exports.plugin = plugin
