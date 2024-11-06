/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        outer: "0px 0px 0.5px 0.2px rgba(0,72,255,1)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "rotate(10deg)" },
          "20%, 40%, 60%, 80%": { transform: "rotate(-10deg)" },
        },
      },
      animation: {
        shake: "shake 1s",
      },
    },
  },
  plugins: [],
};
