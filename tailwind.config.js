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
        secondary: '#050522',
      },
      colors: {
        title: '#EF5858',
        font: '#F4F4F4',
        primary: '#FFDE69',
        secondary: '#050522',
        danger: '#f26c63',
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
        primary: '#FFDE69',
        secondary: '#050522',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      height: {
        160: '40rem',
        128: '32rem',
        112: '28rem',
      },
      boxShadow: {
        'inset-2': 'inset 2px 2px 4px 0px rgba(0, 0, 0, 0.12)',
      },
    },
    plugins: [],
  }
}
