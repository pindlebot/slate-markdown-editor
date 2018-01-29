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
    
    //let url = "https://gist.github.com/" + 
    //  this.props.gist + 
    //  ".json?callback=" + 
    //  gistCallback
    let url = this.props.gist + 'on?callback=' + gistCallback
    console.log(url)

    //if (this.props.file) {
    //  url += "&file=" + this.props.file
    //}
    //url += "&file=" + 'snippet.php'
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
    console.log(this.props)
    if (this.state.loading) {
      return (
        <div 
          {...this.props.attributes}
        >loading...</div>
      )
    } else {
      return (
        <div {...this.props.attributes}>
        <div 
          style={{
            'word-wrap': 'normal',
            'white-space': 'normal'
          }}
          dangerouslySetInnerHTML={{__html: this.state.src}} 
        />
        </div>
      )
    }
  }
}

const Gist = props => <EmbeddedGist {...props} gist={props.script.src} />

export default Gist
