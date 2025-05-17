/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nz-blue': '#005EA6',
        'nz-blue-dark': '#003087',
        'nz-green': '#006747',
        'nz-green-light': '#E6F0E8',
        'nz-gray': '#F5F6F5',
        'nz-text': '#333333'
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.5' }]
      },
      borderRadius: {
        'custom': '8px'
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
};