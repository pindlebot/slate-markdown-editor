// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'
import * as dark from './styles/dark'
const { ThemeProvider } = reactJss

const theme = {
  ...dark
}

function wrapped (context: * = {}) {
  return function (Component: any) {
    function WrappedComponent (props: any) {
      let { plugins } = props

      if (!plugins && context.dev) {
        plugins = require('./plugins/dev').default
      } else {
        plugins = require('./plugins/prod').default
      }
      return (
        <ThemeProvider theme={props.theme || theme}>
          <Component {...props} plugins={plugins} />
        </ThemeProvider>
      )
    }

    return WrappedComponent
  }
}

export default wrapped
