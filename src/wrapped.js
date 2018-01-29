// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'
import * as dark from './styles/dark'

const { ThemeProvider } = reactJss;

function wrapped (context: any ) {
  return function(Component: any) {
    function WrappedComponent (props: any) {
      return(
        <ThemeProvider theme={dark}>
          <Component {...props} />
        </ThemeProvider>
      )
    } 

    return WrappedComponent
  }
}

export default wrapped;