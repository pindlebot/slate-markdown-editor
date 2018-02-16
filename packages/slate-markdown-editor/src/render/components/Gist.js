import * as React from 'react'
import appendStylesheet from 'append-stylesheet'

class EmbeddedGist extends React.Component {
  state = {
    loading: true,
    src: ''
  }

  static gistCallbackId = 0;
  static nextGistCallback = () => 'embed_gist_callback_' + EmbeddedGist.gistCallbackId++;

  componentDidMount () {
    let gistCallback = EmbeddedGist.nextGistCallback()

    window[gistCallback] = gist => {
      if (this.state.loading) {
        this.setState({
          loading: false,
          src: gist.div
        })
        appendStylesheet(gist.stylesheet)
      }
    }

    let url = this.props.script.src + 'on?callback=' + gistCallback
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }

  render () {
    if (this.state.loading) {
      return (
        <div
          {...this.props.attributes}
        >...</div>
      )
    } else {
      return (
        <div {...this.props.attributes}>
          <div
            style={{
              wordWrap: 'normal',
              whiteSpace: 'normal'
            }}
            dangerouslySetInnerHTML={{__html: this.state.src}}
          />
        </div>
      )
    }
  }
}

const Gist = props => <EmbeddedGist {...props} />

export default Gist
