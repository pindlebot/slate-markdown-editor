let debounce = require('lodash.debounce')

const save = (change, opts) => {
  window.localStorage.setItem(
    opts.key, 
    JSON.stringify(change.value.toJSON())
  ) 

  opts.callback()

  return undefined
}

function onKeyDown(
  opts,
  debounced,
  event,
  change,
  editor,
) {

  return debounced(change, opts)
} 

const defaults = {
  key: '_slate_',
  interval: 1000,
  callback: () => { 
    if(process.env.NODE_ENV !== 'production') {
      console.log('Saved state 🙌') 
    }
  }
}

function core(opts = defaults) {
  let debounced = debounce(save, opts.interval)
  
  return {
    onKeyDown: onKeyDown.bind(null, opts, debounced),
    load: () => JSON.parse(
      window.localStorage.getItem(opts.key)
    )
  }
}

export default core;