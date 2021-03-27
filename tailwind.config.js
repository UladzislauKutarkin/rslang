module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {},
    fontFamily: {
      display: ["Oswald"],
    },
    animation: {
      slowGrow: "slowGrow 0.5s ease-in-out",
      lotosRotate: "lotosRotate 2s ease-in-out infinite",
      fallWord: "fallWord 10s linear",
    },

    keyframes: {
      slowGrow: {
        "0%": { transform: "translateY(-10%)", opacity: "0" },

        "100%": { transform: "translateY(0)", opacity: "1" },
      },

      lotosRotate: {
        "0%": { transform: "rotateY(0)" },

        "100%": { transform: "rotateY(180deg)" },
      },
      fallWord: {
        "0%": { top: "10px" },

        "100%": { top: "50vh" },
      },
    },
  },
}
