const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    baseUrl: 'http://localhost:5000', // Ganti dengan URL aplikasi Anda
    video: false, // Menonaktifkan perekaman video untuk pengujian
    screenshotOnRunFailure: false, // Menonaktifkan screenshot pada kegagalan
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
