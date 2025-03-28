const config = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    screens: {
      phone: "600px",
      // => @media (min-width: 600px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1270px",
      // => @media (min-width: 1270px) { ... }
    },
    colors: {
      primary: {
        light: "#df3b3c",
        DEFAULT: "#D80B0C",
        dark: "#970708",
      },
      secondary: "#F08080",
      tertiary: "#F7F8FB",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        200: "#E0E0E0",
        DEFAULT: "#818181",
        body: "#7D7C7C",
      },
      error: {
        DEFAULT: "#FF3C3C",
        dark: "#c40014",
      },
      success: {
        DEFAULT: "#15CF74",
        dark: "#005E38",
      },
      warning: {
        DEFAULT: "#F88F01",
        dark: "#B15500",
      },
    },
    fontSize: {
      none: "0px",
      xs: "11px",
      sm: "13px",
      md: "14px",
      lg: "16px",
      xl: "20px",
      xxl: "26px",
      "2xl": "30px",
      "3xl": "36px",
      "4xl": "42px",
    },

    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },

    fontWeight: {
      DEFAULT: 400,
      thin: 100,
      light: 200,
      "extra-light": 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
      heavy: 900,
    },
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
      },
      borderRadius: {
        DEFAULT: "4px",
        md: "5px",
        lg: "10px",
        xl: "20px",
        full: "9999999px",
      },
      zIndex: {
        "-1": "-1",
        9999: "9999",
      },
      maxWidth: {
        display: "1360px",
        screen: "100vw",
        17: "170px",
      },
      minWidth: {
        0: "0px",
        12: "120px",
        15: "150px",
        17: "170px",
        18: "180px",
        20: "200px",
        25: "250px",
        30: "300px",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      opacity: ["disabled", "group-hover"],
      cursor: ["disabled"],
      backgroundOpacity: ["active"],
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
};

module.exports = config;
