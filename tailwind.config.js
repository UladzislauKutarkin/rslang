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
      fallWord: "fallWord 5s linear",
      disappear: "disappear 0,5s linear",
      appear: "appear 2s",
      fallDrop: "fallDrop 2s",
      puffEffect: "puffEffect 2s",
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
        "0%": { top: "22vh" },

        "100%": { top: "75vh" },
      },
      disappear: {
        "0%": { opacity: 0.5 },

        "100%": { fontSize: "4rem", opacity: 0 },
      },

      appear: {
        "0%": { opacity: 0 },

        "100%": { opacity: 1 },
      },

      fallDrop: {
        "0%": { heigh: "10vh" },

        "100%": { heigh: "75vh" },
      },

      puffEffect: {
        "0%": {
          opacity: 0.5,
          transformOrigin: "50% 50%",
          transform: "scale(2, 2)",
          filter: "blur(2px)",
        },

        "100%": {
          opacity: 1,
          transformOrigin: "50% 50%",
          transform: "scale(1, 1)",
          filter: "blur(0px)",
          width: "0",
        },
      },
    },
  },
}
