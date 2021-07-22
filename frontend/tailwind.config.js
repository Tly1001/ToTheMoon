module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '5px': '5px',
      },
      height: {
        '4px': '4px',
      },
      width: {
        '33px': '33px',
      },
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primaryBlue': '#191970',
      'primaryWhite': '#FFFCF2',
      'primaryGrey': '#706F6F',
      'burgerGrey': '#cdcdcd',
      'burgerBlack': '#232323',
    }),
    scale: {
      '20': '.2',
    },
    translate: {
      'n2': '-2px',
    },
    transformOrigin: {
      'burger': '4px 0px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
