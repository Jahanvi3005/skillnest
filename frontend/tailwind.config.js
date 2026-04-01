/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#4F46E5',
                dark: '#4338CA',
            },
            secondary: {
                DEFAULT: '#10B981',
                dark: '#059669',
            },
            dark: {
                DEFAULT: '#111827',
                lighter: '#1F2937',
            }
        },
        fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        }
    },
  },
  plugins: [],
}
