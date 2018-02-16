// @flow
import * as React from 'react'
import { createTheming } from 'react-jss'
import defaultTheme from './styles/dark'
import plugins from './plugins/prod'

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
