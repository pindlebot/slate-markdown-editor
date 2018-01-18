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
  valueToContent,
  toMarkdown,
  fromMarkdown
} from '../src/util'

class App extends React.Component {
  
  state = {
    value: loadValue()
  }

  test = () => {
    //let out = contentToJSON('## heading 2\n')
    //console.log(out)
    //localStorage.setItem('value', JSON.stringify(out))
    //saveValue(this.state.value)  
    let out = toMarkdown(this.state.value) 
    console.log('toMarkdown',out)
    out = fromMarkdown(out)
    console.log('fromMarkdown',out)
    this.setState({
      value: Value.fromJSON(out)
    })
  }

  onChange = ({ value }) => {
    this.setState({ value }, () => {
      //console.log(value.toJSON())  
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
      <br />
      <br />
      {serializeValue(this.state.value)}
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
