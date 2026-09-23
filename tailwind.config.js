const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.5rem', { lineHeight: '3rem' }],
      '6xl': ['3rem', { lineHeight: '3.5rem' }],
      '7xl': ['4rem', { lineHeight: '4.5rem' }],
    },
    extend: {
      colors: {
        // Lapis Blue (#253D7F) based scale replaces the default gray so every
        // dark surface and heading picks up the brand color.
        neutral: {
          50: '#f5f7fb',
          100: '#eceff6',
          200: '#dbe0ec',
          300: '#bcc4d9',
          400: '#8f9aba',
          500: '#66739a',
          600: '#4a5679',
          700: '#34467f',
          800: '#2d4790',
          900: '#223a78',
          950: '#1b2f66',
        },
        brand: {
          blue: '#253D7F',
          'blue-light': '#3563C9',
          yellow: '#FDB933',
        },
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Onest', ...defaultTheme.fontFamily.sans],
        display: [
          ['Montserrat', ...defaultTheme.fontFamily.sans],
          { fontVariationSettings: 'normal' },
        ],
        philosopher: ['Philosopher', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
