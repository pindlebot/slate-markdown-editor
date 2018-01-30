#!/usr/bin/env bash
git add . 
git commit -am 'new'
npm version patch
babel src/ -d lib/ --ignore src/plugins/packages/
echo 'export default []' > lib/plugins/dev.js
npm publish