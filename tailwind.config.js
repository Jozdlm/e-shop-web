/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn": {
          "@apply rounded px-4 py-2.5 text-sm font-semibold transition": {},
        },
        ".btn-primary": {
          "@apply bg-green-700 text-white hover:bg-green-800": {},
        },
        ".btn-disabled": {
          "@apply cursor-not-allowed bg-gray-500 hover:bg-gray-500": {},
        },
        ".btn-outline": {
          "@apply border border-gray-300 text-green-800 hover:bg-green-500/10 hover:border-green-800":
            {},
        },
      });
    },
  ],
};
