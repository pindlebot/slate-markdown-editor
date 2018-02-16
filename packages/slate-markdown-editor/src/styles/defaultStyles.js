// @flow
import createTheme from './createTheme'

const theme = createTheme({})
export default {
  fontFamily: '"Open Sans"',
  colors: {
    ...theme.palette
  }
}
