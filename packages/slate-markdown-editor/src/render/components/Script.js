import * as React from 'react'

class Script extends React.Component {
  state = {
    didLoad: false
  }

  componentDidMount () {
    let key = this.props.node.key
    let elem = this.scriptRef
    let src = this.props.script.src

    if (src && !this.state.didLoad) {
      this.setState({didLoad: true}, () => {
        elem.appendChild(this.createScript(src))
      })
    }
  }

  createScript = src => {
    let tag = document.createElement('script')
    tag.async = false
    tag.src = src
    return tag
  }

  render () {
    return (
      <div
        {...this.props.attributes}
        style={{
          'wordWrap': 'normal',
          'whiteSpace': 'normal'
        }}
        data-type={'script'}
        ref={(script) => { this.scriptRef = script }}
        contentEditable={false}
      />
    )
  }
}

export default props => <Script {...props} />
