#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const NM = path.join(__dirname, '../node_modules')

function rm(module) {
  let babelRc = path.join(NM, module, '.babelrc')
  if(fs.existsSync(babelRc)) {
    console.log('unlinking ' + babelRc)
    fs.unlinkSync(babelRc)
  }  
}

function rmBabelRc() {
  let modules = fs.readdirSync(NM)
  
  while(modules.length) {
    let module = modules.shift()

    if(module.indexOf('@') > -1) {
      let dirs = fs.readdirSync(path.join(NM, module))
      for(let dir of dirs) {
        let scoped = path.join(module, dir)
        rm(
          scoped
        )
      }

      continue
    }

    rm(module)
  }  
}

rmBabelRc()