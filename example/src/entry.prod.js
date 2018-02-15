
import * as React from 'react'
import { render } from 'react-dom'
import Editor from 'slate-markdown-editor'
import App from './'

render(
  <App Editor={Editor} />, 
  document.getElementById('root')
)