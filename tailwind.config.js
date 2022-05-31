module.exports = {
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
          prose: "74ch",
      }
    },
  },
  variants: {},
  plugins: [],
  content: ["./_site/**/*.{md,njk,sass}"],
};
