#!/usr/bin/env bash
cd example
rm -rf dist
rm -rf .cache
NODE_ENV=production parcel build src/index.html --no-minify --public-url / --no-cache
yarn add slate-markdown-editor@latest
git init
git add .
git commit -am 'new'
heroku git:remote -a markdown-edit
git push -f heroku master
rm -rf .git