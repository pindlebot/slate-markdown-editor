import * as React from 'react'
import fromPairs from 'lodash.frompairs'
import mapValues from 'lodash.mapvalues'

class Script extends React.Component {
    
  componentDidMount() {
    let key = this.props.node.key;
    let elem = this.scriptRef;
    let hasScript = [...elem.children]
      .some(child => child.tagName === 'SCRIPT')

    let src = this.props.script.src;
    if(src && !hasScript) {
      elem.appendChild(this.createScript(src))        
    }
  }

  createScript = src => {
    let tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    return tag;
  }
    
  render() {
    return(
      <div 
        {...this.props.attributes}
        style={{
          'word-wrap': 'normal',
          'white-space': 'normal'
        }}
        data-type={'script'}
        ref={(script) => { this.scriptRef = script }}
        contentEditable={false}    
      />
    )
  }
}

export default props => <Script {...props} />