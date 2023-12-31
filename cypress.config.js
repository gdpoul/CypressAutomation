const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  "env":{
    "url":"https://website-fbn.nivodaapi.net/",
    "adminName":"Ubaid Ullah"
  },
  "defaultCommandTimeout":30000,
  "watchForFileChanges":false,
  "downloadsFolder":"cypress/downloads",
  retries:{
    runMode:1
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions:{
    "reportFilename": "Report",
    "overwrite":false,
    "html": true,
    "json": true,
    "quiet": true,
    "timestamp":"ddmmyyyy_HHMMss"
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {downloadFile});
    },
  },
});
