// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'
import * as dark from './styles/dark'

const { ThemeProvider } = reactJss;

const wrapped = (Component: any) => {
  class WrappedComponent extends React.Component {
    render() {
      return(
        <ThemeProvider theme={dark}>
          <Component {...this.props} />
        </ThemeProvider>
      )
    }
  } 
  return WrappedComponent
}

export default wrapped;