module.exports = {
  content: ["./app/**/*.ts(x)", "./app/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        // base palate: https://coolors.co/e5c2c0-8fd5a6-329f5b-0c8346-0d5d56
        primary: {
          900: "#064223",
          800: "#08532C",
          700: "#14723F",
          600: "#0C8346",
          500: "#1F9151",
          400: "#329F5B",
          300: "#61BA81",
          200: "#8FD5A6",
          100: "#C7EAD3"
        },
        secondary: {
          DEFAULT: "#0D5D56",
          900: "#254341",
          800: "#4A8681",
          700: "#689A96",
          600: "#86AEAB",
          500: "#96B9B6",
          400: "#A5C3C0",
          300: "#C3D7D5",
          200: "#E1EBEA",
          100: "#F0F5F5"
        },
        accent: {
          DEFAULT: "#E5C2C0", // 300
          900: "#3A3130",
          800: "#736160",
          700: "#907A78",
          600: "#AC9290",
          500: "#C9AAA8",
          400: "#D7B6B4",
          300: "#E5C2C0",
          200: "#ECD2D0",
          100: "#F2E1E0",
        },
      },
      fontFamily: {
        sans: ["TenorSans", "sans-serif"],
        serif: ["CantanaOne", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#0D5D56",
              "&:hover": {
                color: "#AC9290",
              },
              "&:visited": {
                color: "#907A78",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
