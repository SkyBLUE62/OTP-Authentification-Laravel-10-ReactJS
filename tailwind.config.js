/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      backgroundColor: {
        card: '#FFECAA',
        btnPrimary: '#FFDE69',
        primary: '#050522',
      },
      colors: {
        title: '#EF5858',
        font: '#F4F4F4',
        primary: '#FFDE69',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontFace: {
        montserrat: {
          family: 'Montserrat',
          src: "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap')",
        },
      },
      borderColor: {
        primary: '#FFDE69'
      },
    },
    plugins: [],
  }
}
