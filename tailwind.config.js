module.exports = {
  content: ["./app/**/*.ts(x)"],
  theme: {
    extend: {
      colors: {
        // color palatte: https://coolors.co/fcbd03-bec5ad-519872-3b5249-34252f
        primary: {
          DEFAULT: "#FCBD03",
          50: "#FEEDB8",
          100: "#FEE7A4",
          200: "#FDDD7C",
          300: "#FDD254",
          400: "#FCC82B",
          500: "#FCBD03",
          600: "#C59302",
          700: "#8D6A02",
          800: "#564001",
          900: "#1E1700",
        },
        secondary: {
          DEFAULT: "#519872",
          50: "#C2DFCF",
          100: "#B5D7C5",
          200: "#9AC9B0",
          300: "#80BB9B",
          400: "#65AD86",
          500: "#519872",
          600: "#3D7357",
          700: "#2A4F3B",
          800: "#162A20",
          900: "#030604",
        },
        clay: {
          DEFAULT: "#BEC5AD",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#F7F8F5",
          300: "#E4E7DD",
          400: "#D1D6C5",
          500: "#BEC5AD",
          600: "#A4AE8C",
          700: "#8A976B",
          800: "#6C7654",
          900: "#4E553C",
        },
        mineral: {
          DEFAULT: "#3B5249",
          50: "#93B1A6",
          100: "#87A99C",
          200: "#709888",
          300: "#5D8173",
          400: "#4C6A5E",
          500: "#3B5249",
          600: "#24312C",
          700: "#0C110F",
          800: "#000000",
          900: "#000000",
        },
        coffee: {
          DEFAULT: "#34252F",
        },
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
        mono: ["Source Code Pro", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#05803a", // custom color secondary-ish
              "&:hover": {
                color: "#65AD86", // secondary-400
              },
              "&:visited": {
                color: "#8D6A02", // primary-700
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
