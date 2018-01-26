import React from 'react';
import { render } from 'react-dom'
import { Value } from 'slate'
import Editor from '../lib'
import INITIAL_VALUE from './value'
import { 
  exportMarkdown,
  importMarkdown
} from '../lib/util'
import * as colors from '../lib/styles/dark'
import Btn from './Btn'

class App extends React.Component {
  
  state = {
    value: INITIAL_VALUE
  }

  load = () => {   
    let value = JSON.parse(
      window.localStorage.getItem('_slate_')
    )
    this.setState({
      value: Value.fromJSON(value)
    })
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return(
      <div style={{
        height: '100%',
        width: '100%',
        backgroundColor: colors.backgroundColor,   
        overflow: 'auto'        
      }}>
        <div style={{
          height: '100%',
          padding: '10px',
          color: '#f1f1f0',
          fontFamily: '"Open Sans"',
        }}>
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            toolbar={
              <Btn load={this.load} />             
            }
          />
        </div>
        <div>
        </div>        
      </div>
    )
  }
}

render(
  <App />, 
  document.getElementById('root')
)
