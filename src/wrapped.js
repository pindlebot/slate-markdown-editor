// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'

const { ThemeProvider } = reactJss;

const wrapped = (Component: any) => {
  class WrappedComponent extends React.Component {
    render() {
      return(
        <ThemeProvider theme={{}}>
          <Component {...this.props} />
        </ThemeProvider>
      )
    }
  } 
  return WrappedComponent
}

export default wrapped;