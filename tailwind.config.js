module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    fontFamily: {
      display: ["Oswald"],
    },
    animation: { slowGrow: "slowGrow 0.5s ease-in-out" },

    keyframes: {
      slowGrow: {
        "0%": { transform: "translateY(-10%)", opacity: "0" },

        "100%": { transform: "translateY(0)", opacity: "1" },
      },
    },
  },
};
