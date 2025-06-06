/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    enabled: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './index.html',
    ],
    options: {
      safelist: [
        'text-green-400',
        'bg-gray-900',
        'border-gray-700',
        'hover:text-green-300',
        'focus:border-green-400',
      ],
      blocklist: [
        /^debug-/,
        /^example-/
      ],
      keyframes: true,
      fontFace: true
    }
  }
};
