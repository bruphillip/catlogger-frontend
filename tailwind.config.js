/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      // colors: {
      //   primary: '#FCB5B5',
      //   secondary: '#FCDDF2',
      //   amethyst: '#9b59b6',
      //   pomegranate: '#c0392b'
      // }
    }
  },
  daisyui: {
    prefix: 'd-',
    themes: [
      {
        mytheme: {
          primary: '#6419E6',
          secondary: '#D926A9',
          accent: '#1FB2A6',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}
