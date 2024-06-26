// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.ejs', // Aquí se incluyen todos los archivos .ejs dentro de /src
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './public/**/*.html',
  ],
  darkMode: false, // O 'media' o 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
