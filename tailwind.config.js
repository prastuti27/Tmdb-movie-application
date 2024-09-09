module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15dace", // This is the color value for bg-teal-500
      },
      fontFamily: {
        lexend: ["'Lexend Deca'", "sans-serif"],
      },
      keyframes: {
        trailorPlay: {
          "0%": {
            strokeDashoffset: "480",
            opacity: "0",
            transform: "translateY(0)",
          },
          "100%": {
            strokeDashoffset: "0",
            opacity: "1",
            transform: "translateY(-10px)",
          },
        },
        circleAnimation: {
          "0%": { strokeDashoffset: "1300" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        trailorPlay: "trailorPlay 0.7s ease-in-out",
        circleAnimation: "circleAnimation 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
