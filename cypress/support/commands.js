
/**=================Login to Nivoda Application================= */
Cypress.Commands.add('loginToNivoda', (email, password) => {

  cy.get("input[placeholder='Email']").type(email);
  cy.get("input[placeholder='Password']").type(password);
  cy.get("button[aria-label='login-button']").click();
  cy.get('div.profile--picture').should('be.visible')
});

/**=================Find Number from Given String================= */
Cypress.Commands.add('getNumberPatternFromString',(label)=>{

  let numberPattern = /\d+/;
  let match = label.match(numberPattern);
  
  if(match){
   let number = parseInt(match[0]);
   return number;
  }
  else{
   cy.log("No number found in the text.");
   assert.fail();
  }

});

/**=================Hide fetch/XHR requests================= */
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
};

Cypress.Commands.overwrite('server', (originalFn, ...options) => {
  options[0].onAnyRequest = (route) => {
    route.abort();
  };
  return originalFn(...options);
});

/**=================find the list of files inside folder================= */
Cypress.Commands.add('listFilesInFolder', (folderPath) => {
  const listCommand = Cypress.platform === 'win32' ? `dir /b "${folderPath}"` : `ls -1 "${folderPath}"`;
  return cy.exec(listCommand).its('stdout').then((stdout) => {
    // Extract only the lines containing file names using line breaks
    const fileLines = stdout.split(/\r?\n/).filter((line) => line.trim() !== '');

    // Extract file names from the lines
    const fileNames = fileLines.map((line) => {
      const matches = line.match(/[^\\/:*?"<>|]+$/);
      return matches ? matches[0] : '';
    });

    return fileNames;
  });
});

/**=================get latest downloaded file name================= */

Cypress.Commands.add('getLatestFile', { prevSubject: false }, (folderPath) => {
  const formattedFolderPath = Cypress.platform === 'win32' ? `"${folderPath}"` : folderPath;
  const command = Cypress.platform === 'win32' ? `dir /b /od ${formattedFolderPath}` : `ls -t ${formattedFolderPath}`;
  
  return cy.exec(command).then(({ stdout }) => {
    const files = stdout.trim().split('\n');
    return files.length > 0 ? files[files.length - 1] : null; // On Windows, the latest file is listed at the end (oldest to newest).
  });
});

/**=================Read CSV Data================= */
const neatCSV = require('neat-csv');
Cypress.Commands.add('ReadCSVFileAndConvertObject',(fileName)=>{
  let csvData;
  cy.readFile(fileName).then(neatCSV).then(data=>{ 
    csvData=data; // convert csv file into an object
    return csvData;
  });
})