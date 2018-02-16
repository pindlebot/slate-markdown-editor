// @flow
import * as React from 'react'
import { createTheming } from 'react-jss'
import createTheme from './styles/createTheme'
import plugins from './plugins/prod'

const defaultTheme = createTheme({})

export const theming = createTheming('__slate_markdown_editor__')

const { ThemeProvider } = theming

function wrapped (Component: any) {
  return function (props: any) {
    const { theme, ...rest } = props
    const mergedTheme = {
      ...defaultTheme,
      ...theme
    }

    const mergedProps = {
      plugins,
      ...rest
    }

    const component = (
      <ThemeProvider theme={mergedTheme} >
        <Component {...mergedProps} />
      </ThemeProvider>
    )

    return component
  }
}

export default wrapped
