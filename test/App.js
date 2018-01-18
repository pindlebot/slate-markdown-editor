import React from 'react';
import { render } from 'react-dom'
import Editor from '../src'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import { 
  serializeValue, 
  deserializeJSON,
  saveValue,
  loadValue,
  contentToJSON,
  valueToContent
} from '../src/util'

class App extends React.Component {
  
  state = {
    value: loadValue()
  }

  test = () => {
    saveValue(this.state.value)   
  }

  onChange = ({ value }) => {
    this.setState({ value }, () => {
      console.log(value.toJSON())  
    })
  }

  render() {
    return(
      <div>
        <button onClick={() => this.test()}>Load</button>
      <Editor
        value={this.state.value}
        onChange={this.onChange}
      />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
