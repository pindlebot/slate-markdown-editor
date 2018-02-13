// @flow
import * as React from 'react'
import * as reactJss from 'react-jss'
import * as dark from './styles/dark'
const { ThemeProvider } = reactJss
import plugins from './plugins/prod'

const theme = {
  ...dark
}

function wrapped (Component: any) {
  return function (props: any) {
    const component = (
      <ThemeProvider theme={props.theme || theme}>
        <Component {...props} plugins={plugins} />
      </ThemeProvider>
    )

    return component
  }  
}

export default wrapped
