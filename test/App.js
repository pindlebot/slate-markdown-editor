import React from 'react';
import { render } from 'react-dom'
import Editor from '../src'
import INITIAL_VALUE from '../src/value'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'
import { 
  serialize,
  deserialize
} from '../src/util'

const btnStyles = {
  whiteSpace: 'nowrap',
  display: 'inline-block',
  height: '40px',
  lineHeight: '32px',
  margin: '0',
  padding: '0 14px',
  boxShadow: 'rgba(50, 50, 93, 0.109804) 0px 4px 6px 0px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px 0px',
  //borderRadius: '4px',
  fontSize: '15px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  color: '#777',
  textDecoration: 'none',
  transition: 'all .15s ease',
  //background: '#3ecf8e',
  background: '#fafafa',
  border: 'none',
  cursor: 'pointer',
  maxWidth: '260px',
  marginRight: '1em',
}
class App extends React.Component {
  
  state = {
    value: INITIAL_VALUE
  }

  save = () => {   
    let text = serialize(this.state.value.document)
    let document = deserialize(text)
    console.log(document.toJSON())
    this.setState({ value: Value.fromJSON({document})  })
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return(
      <div style={{
        height: '100%',
        maxWidth: '720px', 
        margin: '20px auto', 
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          margin: '20px 0',
          minHeight: '70%',
          boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)'
        }}>
          <Editor
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <div>
          <button onClick={() => this.save()} style={btnStyles}>Load</button>  
        </div>        
        
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
