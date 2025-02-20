/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        official: ["Oswald", "sans-serif"], // Custom font for typography
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")], // Fixed duplicate `plugins`
};




