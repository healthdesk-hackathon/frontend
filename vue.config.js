module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/theme";` // make variables available in every component
      }
    }
  }
};
