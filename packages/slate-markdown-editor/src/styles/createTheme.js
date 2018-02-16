// @flow
export const foregroundColor = '#eff0eb'
export const backgroundColor = '#282a36'
export const red = '#ff5c57'
export const green = '#5af78e'
export const yellow = '#f3f99d'
export const blue = '#57c7ff'
export const magenta = '#ff6ac1'
export const cyan = '#9aedfe'
export const borderColor = '#222430'
export const cursorColor = '#97979b'
export const white = '#f1f1f0'
export const lightBlack = '#686868'

export const defaultPalette = {
  foregroundColor,
  backgroundColor,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  borderColor,
  cursorColor,
  white,
  lightBlack
}

const createStyles = palette => ({
  blockquote: {
    root: {
      margin: '0 0 0 10px',
      padding: '0 0 0 10px',
      borderLeft: '2px solid ' + palette.cyan,
      backgroundColor: palette.lightBlack
    }
  },
  code_block: {
    root: {
      backgroundColor: `${palette.borderColor} !important`,
      borderRadius: 0,
      '&:before': {
        content: '"```"',
        color: palette.foregroundColor,
        verticalAlign: 'top'
      },
      '&:after': {
        content: '"```"',
        verticalAlign: 'bottom',
        color: palette.foregroundColor,
        lineHeight: 0
      }
    }
  },
  code_line: {
    root: {
      display: 'block'
    }
  },
  image: {
    root: {}
  },
  link: {
    root: {
      color: palette.blue
    }
  },
  ordered_list: {
    root: {
      'list-style-type': 'none',
      margin: '0 0 0 20px',
      padding: 0
    }
  },
  unordered_list: {
    root: {
      'list-style-type': 'none',
      margin: '0 0 0 20px',
      padding: 0
    }
  },
  unstyled: {
    root: {}
  },
  paragraph: {
    root: {}
  }
})

function createTheme ({ palette = {}, overrides = {} }) {

  palette = {
    ...defaultPalette,
    ...palette
  }

  overrides = {
    ...overrides,
    ...createStyles(palette)
  }

  return {
    palette,
    colors: palette,
    ...overrides
  }
}

export default createTheme
