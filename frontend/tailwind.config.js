/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff5023",
        secondary: "#37394f",
      },
      maxWidth: {
        page: "1120px",
      },
      spacing: {
        header: "64px",
        footer: "110px",
      },
    },
  },
  plugins: [],
};
