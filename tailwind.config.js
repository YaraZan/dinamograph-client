import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
      extend: {
          fontFamily: {
              'mohave': ['Mohave'],
              'raleway': ['Raleway'],
          },
          colors: {
              'primary': '#6F00FF',
              'white': '#FFFFFF',
              'black': '#000000',
              'gray-1': '#F8F8F8',
              'gray-11': '#FCFCFC',
              'gray-12': '#ECECEC',
              'gray-10': '#E7E7E7',
              'gray-2': '#FAFAFA',
              'gray-3': '#F6F6F6',
              'gray-4': '#B5B5B5',
              'gray-5': '#D2D2D2',
              'gray-51': '#BFBFBF',
              'gray-6': '#4A4A4A',
              'gray-7': '#303030',
              'gray-8': '#2C2C2C',
              'gray-9': '#242424',
              'gray-50': '#1A1A1A',
              'purple-1': '#A763FF',
              'purple-2': '#5B00D2',
          },
      },
      colors: {
        ...colors,
      }
  },
  darkMode: 'class',
  plugins: [],
}

