// @flow
// export const foregroundColor = '#eff0eb'
// export const backgroundColor = '#282a36'
// export const red = '#ff5c57'
// export const green = '#5af78e'
// export const yellow = '#f3f99d'
// export const blue = '#57c7ff'
// export const magenta = '#ff6ac1'
// export const cyan = '#9aedfe'
// export const borderColor = '#222430'
// export const cursorColor = '#97979b'
// export const white = '#f1f1f0'
// export const lightBlack = '#686868'

const accentColor = '#FB3640'
const secondaryColor = '#0A2463'
const primaryColor = '#272635'
const textColor = 'rgba(0,0,0,.84)'
const secondaryTextColor = 'rgba(0,0,0,.54)'
const backgroundColor = '#E8E9F3'

export const defaultPalette = {
  accentColor,
  secondaryColor,
  primaryColor,
  textColor,
  secondaryTextColor,
  backgroundColor
}

const createStyles = palette => ({
  blockquote: {
    root: {
      margin: '0 0 20px 20px',
      padding: '10px 0 10px 10px',
      borderLeft: '2px solid ' + palette.secondaryColor,
      backgroundColor: palette.backgroundColor,
      '& > p': {
        marginBottom: 0
      }
    }
  },
  code_block: {
    root: {
      backgroundColor: `${palette.backgroundColor}`,
      padding: '5px 10px 5px 10px',
      borderRadius: 0,
      '&:before': {
        content: '"```"',
        color: palette.secondaryTextColor,
        verticalAlign: 'top'
      },
      '&:after': {
        content: '"```"',
        verticalAlign: 'bottom',
        color: palette.secondaryTextColor,
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
      color: palette.secondaryColor
    }
  },
  ordered_list: {
    root: {
      'list-style-type': 'none',
      margin: '20px 0 20px 20px',
      padding: 0
    }
  },
  unordered_list: {
    root: {
      'list-style-type': 'none',
      margin: '20px 0 20px 20px',
      padding: 0
    }
  },
  list_item: {
    root: {
      '&:before': {
        color: palette.backgroundColor
      },
      '& > p': {
        display: 'inline-block',
        marginBottom: 0
      },
      '& > ul': {
        marginTop: '0 !important'
      },
      '& > ol': {
        marginTop: '0 !important'
      }
    }
  },
  unstyled: {
    root: {}
  },
  paragraph: {
    root: {
      '--x-height-multiplier': 0.375,
      '--baseline-multiplier': 0.17,
      letterSpacing: '.01rem',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '1.58',
      margin: '0 0 20px 0'
    }
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
