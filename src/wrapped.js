// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'
import * as dark from './styles/dark'
const { ThemeProvider } = reactJss;

const load = require

function wrapped (context = {}) {
  return function(Component: any) {
    function WrappedComponent (props: any) {
      let { plugins } = props;
      console.log(context)
      if(!plugins && context.dev) {
        plugins = require('./plugins/prod').default
      } else {
        plugins = require('./plugins/dev').default
      }
      return(
        <ThemeProvider theme={props.theme || dark}>
          <Component {...props} plugins={plugins} />
        </ThemeProvider>
      )
    } 

    return WrappedComponent
  }
}

export default wrapped;