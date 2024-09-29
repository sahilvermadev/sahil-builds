// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
