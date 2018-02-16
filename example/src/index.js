import React from 'react';
import { render } from 'react-dom'
import { Value } from 'slate'
import INITIAL_VALUE from './value'
import Btn from './Btn'
const VALUE = require('./value.json')

class App extends React.Component {

  state = {
    value: Value.fromJSON(VALUE)
  }

  static getValue = () => Value.fromJSON(
    JSON.parse(
      window.localStorage.getItem('_slate_')
    )
  )

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

  componentDidMount() {
  }

  renderEditor = () => {
    const Editor = this.props.Editor;
    return (
      <Editor
      value={this.state.value}
      onChange={this.onChange}
      toolbar={
        <Btn load={this.load} />             
      }
      />
    )
  }

  render() {
    return(
      <div style={{
        height: '100%',
        width: '100%',
        //backgroundColor: '#282a36',
        overflow: 'auto'        
      }}>
        <div style={{
          height: '100%',
          padding: '10px',
          //color: '#f1f1f0',
          fontFamily: '"Open Sans"',
        }}>
         {this.renderEditor()}
        </div>
        <div>
        </div>        
      </div>
    )
  }
}

export default App
