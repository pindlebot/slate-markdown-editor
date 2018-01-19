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

const btnStyles = {
  whiteSpace: 'nowrap',
  display: 'inline-block',
  height: '40px',
  lineHeight: '32px',
  margin: '0',
  padding: '0 14px',
  boxShadow: 'rgba(50, 50, 93, 0.109804) 0px 4px 6px 0px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px 0px',
  borderRadius: '4px',
  fontSize: '15px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  color: 'white',
  textDecoration: 'none',
  transition: 'all .15s ease',
  background: '#3ecf8e',
  border: 'none',
  cursor: 'pointer',
  maxWidth: '260px',
  marginRight: '1em',
}
class App extends React.Component {
  
  state = {
    value: loadValue()
  }

  test = () => {
    let out = toMarkdown(this.state.value) 
    console.log('toMarkdown', out)

    out = fromMarkdown(out)
    console.log('fromMarkdown', out)
    
    this.setState({
      value: Value.fromJSON(out)
    })
  }

  onChange = ({ value }) => {
    this.setState({ value }, () => {

    })
  }

  render() {
    return(
      <div style={{
        height: '100%',
        maxWidth: '720px', 
        margin: '20px auto', 
      }}>
        <div style={{
          backgroundColor: '#fafafa',
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
          <button onClick={() => this.test()} style={btnStyles}>Load</button>  
        </div>        
        
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
