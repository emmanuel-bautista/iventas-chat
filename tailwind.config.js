module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#20CC81",
        "primary-light": "#ECFFF7",
        secondary: "#F3F4F8",
        "blue-light": "rgba(0, 153, 255, 0.05)",
        light: "#F3F4F8",
        "gray-100": "#9193A6",
        "gray-200": "#757575",
      },
      maxWidth: {
        "1/2": "60%",
        "3/4": "85%",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        22: "22px",
        40: "40px",
      },
      keyframes: {
        userinfo: {
          "0%": { top: "100%" },
          "100%": { top: "8rem" },
        },
        "img-user": {
          "0%": { top: "100%" },
          "100%": { top: "4rem" },
        },
      },
      animation: {
        userinfo: "userinfo 0.5s ease",
        "img-user": "img-user 0.5s ease",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
