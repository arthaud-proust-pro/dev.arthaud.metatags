module.exports = {
  content: [
    "./themes/**/layouts/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html"
  ],
  theme: {
    colors: {
       // primary: '#a4ce65',
      primary: '#d38b5e',
       secondary: 'black',
      //primary: 'dodgerblue',
      //secondary: '#0d1829',
    },
    fontFamily: {
      sans: ['Hind'],
      display: ['Montserrat']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '8rem',
        '2xl': '12rem',
      },
    },
  },
  plugins: [
  ]
}
