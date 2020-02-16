module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"]
    },
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: "vmin",
      selectorBlackList: [
        ".ignore",
        ".van-cell",
        ".van-button",
        ".van-skeleton",
        ".van-toast",
        ".van-popup__close-icon",
        ".van-field__clear",
        "van",
        ".intl-tel-input"
      ],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};
