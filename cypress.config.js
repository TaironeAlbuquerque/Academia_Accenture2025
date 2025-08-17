const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const cucumber = require("cypress-cucumber-preprocessor").default;
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/e2e/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: "https://demoqa.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
  env: {
    TAGS: "not @ignore"
  }
});