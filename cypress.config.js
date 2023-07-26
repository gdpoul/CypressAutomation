const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  "defaultCommandTimeout":30000,
  "watchForFileChanges":false,
  "downloadsFolder":"cypress/downloads",

  "env":{
    "url":"https://website-fbn.nivodaapi.net/",
    "adminName":"Ubaid Ullah"
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {downloadFile});
    },
  },
});
