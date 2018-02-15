
import * as React from 'react'
import { render } from 'react-dom'
import * as sme from '../../packages/slate-markdown-editor/src'
import App from './'

render(
  <App Editor={sme.Editor} />, 
  document.getElementById('root')
)