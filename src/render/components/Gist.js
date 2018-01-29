import * as React from 'react'

class EmbeddedGist extends React.Component {
  state = {
    loading: true,
    src: ''
  }
  
  static gistCallbackId = 0;
  static nextGistCallback = () => "embed_gist_callback_" + EmbeddedGist.gistCallbackId++;
  
  componentDidMount() {
    let gistCallback = EmbeddedGist.nextGistCallback();

    window[gistCallback] = gist => {
      if (this.state.loading) {
        this.setState({
          loading: false,
          src: gist.div
        })
        this.addStylesheet(gist.stylesheet)
      }
    }
    
    let url = this.props.script.src + 'on?callback=' + gistCallback
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }

  addStylesheet = (href) => {
    if (!this.stylesheetAdded) {
      this.stylesheetAdded = true;
      var link = document.createElement('link');
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = href;

      document.head.appendChild(link);
    }
  }

  render() {
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
          data-type='gist'
        />
        </div>
      )
    }
  }
}

const Gist = props => <EmbeddedGist {...props} />

export default Gist
