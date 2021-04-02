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
      swap: "swap 2s",
      spaceInUp: "swap 1s",
      spaceInRight: "spaceInRight 1s",
      spaceOutLeft: "spaceOutLeft 1s",
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
          filter: "blur(2px) hue-rotate(180deg)",
        },
        "100%": {
          filter: "blur(0px) hue-rotate(0deg) ",
        },
      },
      swap: {
        "0%": {
          opacity: "0",
          transformOrigin: "0 100%",
          transform: "scale(0, 0) translate(-700px, 0px)",
        },
        "100%": {
          opacity: "1",
          transformOrigin: "100% 100%",
          transform: "scale(1, 1) translate(0px, 0px)",
        },
      },

      spaceInUp: {
        "0%": {
          opacity: 0,
          transformOrigin: "50% 0%",
          transform: "scale(0.2) translate(0%, -200%)",
        },
        "100%": {
          opacity: "1",
          transformOrigin: "50% 0%",
          transform: "scale(1) translate(0%, 0%)",
        },
      },

      spaceInRight: {
        "0%": {
          opacity: 0,
          transformOrigin: "100% 50%",
          transform: " scale(0.2) translate(200%, 0%)",
        },
        "100%": {
          opacity: 1,
          transformOrigin: "100% 50%",
          transform: "scale(1) translate(0%, 0%)",
        },
      },

      spaceOutLeft: {
        "0%": {
          opacity: 1,
          transformOrigin: "0% 50%",
          transform: "scale(1) translate(0%, 0%)",
        },
        "100%": {
          opacity: 0,
          transformOrigin: "0% 50%",
          transform: "scale(0.2) translate(-200%, 0%)",
        },
      },
    },
  },
}
