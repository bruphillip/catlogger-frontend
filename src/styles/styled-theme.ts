import { darken, lighten } from 'polished'

const theme = {
  colors: {
    amethyst: '#9b59b6',
    wetAsphalt: '#34495e',
    lightBlue: '#AFDBD2',
    onyx: '#36313D',
    primary: '#FCB5B5',
    secondary: '#FCDDF2',
    white: '#fff',
    black: '#000',
    pomegranate: '#c0392b'
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em'
  }
} as const

type ThemeProps = typeof theme
type ColorProp = keyof ThemeProps['colors']

function darker(color: ColorProp, amount: number) {
  return darken(amount, theme.colors[color])
}

function lighter(color: ColorProp, amount: number) {
  return lighten(amount, theme.colors[color])
}

export default { ...theme, darker, lighter }
