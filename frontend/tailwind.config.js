module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'primaryBlue': '#191970',
      'primaryWhite': '#FFFCF2',
      'primaryGrey': '#706F6F',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
