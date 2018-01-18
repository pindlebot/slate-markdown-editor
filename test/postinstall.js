#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

function rmBabelRc() {
  let nodeModules = path.join(__dirname, '../node_modules')
  let deps = fs.readdirSync(
    nodeModules
  )
  
  deps.forEach(dep => {
    let babelRc = path.join(nodeModules, dep, '.babelrc')
    if(fs.existsSync(babelRc)) {
      console.log('unlinking ' + babelRc)
      fs.unlinkSync(babelRc)
    }  
  })  
}

rmBabelRc()