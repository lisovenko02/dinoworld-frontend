import type { Config } from 'tailwindcss'
import { createThemes } from 'tw-colors'
import colors from 'tailwindcss/colors'

const baseColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
  'slate',
]

const shadeMapping = {
  '50': '900',
  '100': '800',
  '200': '700',
  '300': '600',
  '400': '500',
  '500': '400',
  '600': '300',
  '700': '200',
  '800': '100',
  '900': '50',
}

const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {}
  baseColors.forEach((color) => {
    theme[color] = {}
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key
      theme[color][key] = colors[color][shadeKey]
    })
  })
  return theme
}

const lightTheme = generateThemeObject(colors, shadeMapping)
const darkTheme = generateThemeObject(colors, shadeMapping, true)

const themes = {
  light: {
    ...lightTheme,
    white: '#ffffff',
    sidebar: colors.gray['800'],
    background: colors.gray['50'],
  },
  dark: {
    ...darkTheme,
    white: '#2e2e2e',
    black: '#1e1e1e',
    sidebar: '#2e2e2e',
    background: '#1e1e1e',
    textPrimary: '#E0E0E0',
    textSecondary: '#B0BEC5',
  },
}

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        sidebar: '#2e2e2e',
        background: '#1e1e1e',
      },
    },
  },
  plugins: [createThemes(themes)],
}

export default config
