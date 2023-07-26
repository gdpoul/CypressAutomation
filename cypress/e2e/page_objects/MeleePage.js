import 'cypress-file-upload';
const neatCSV = require('neat-csv');

class MeleePage{

    /**======================Locators======================== */
    getFilterBtn(){
        return cy.get('div.filterColumns__inputs>div:first-child')
    }
    getApplyBtn(){
        return cy.get('button.menu_action__apply');
    }
    getTotalRow(){
        return cy.get("div#table_rows div[role='rowgroup']")
    }

    /**======================Actions======================== */

    selectSupplierNameFromDropdown(label){
        this.getFilterBtn().click();
        cy.xpath("//div[text()='Supplier Name']/../following-sibling::div//div[@class='Select-placeholder']")
          .click({force: true});
        cy.xpath("//div[@class='Select-menu']//div[@aria-label='"+label+"']").click();  
        this.getApplyBtn().click();
    }
    
    downloadCSVFile(){
        cy.get('button.export-csv').click();
        cy.get('button.menu_action:first-child').click();
    }

    downloadCSVFileAndVerifySupplierName(supplierName){        
        this.selectSupplierNameFromDropdown(supplierName);      
        cy.wait(10000);
        let rowLength=0;
        this.getTotalRow().then(($row)=>{
            rowLength=$row.length;
            cy.log("Actual Row length after applying filter: "+rowLength);
        })

        this.downloadCSVFile();
        cy.wait(10000);   
        const folderPath = 'D:/Ganesh/NIVODA/cypress/downloads';
        let csvFileName;
        cy.listFilesInFolder(folderPath).then((fileNames) => {
            csvFileName=fileNames[0];
            cy.log(csvFileName);
            cy.wait(5000);
            // verify csv data i.e. total rows & Supplier Name
            cy.ReadCSVFileAndConvertObject(`${downloadFolderPath}/${latestFileName}`).then((csvData)=>{
              expect(rowLength).eq(csvData.length);
              let name= csvData[0]['Supplier Name'];
              expect(supplierName.toLowerCase()).eq(name.toLowerCase());
            });
        });
    }

    downloadCSVFileAndVerifyData(supplierName){
        let rowLength=0;
        const downloadFolderPath = 'cypress/downloads';
        this.selectSupplierNameFromDropdown(supplierName);
        cy.wait(10000);
        this.getTotalRow().then(($row)=>{
            rowLength=$row.length;
            cy.log("Actual Row length after applying filter: "+rowLength);
        })

        //download the csv file
        this.downloadCSVFile();
        cy.wait(8000);

       // Get the latest downloaded file in the downloads folder
       cy.getLatestFile(downloadFolderPath).then((latestFileName) => { 

          // If no file found, the test should fail
          if (!latestFileName) {
            throw new Error('No downloaded file found.');
          }
          else{
            cy.log("New file Name is : "+latestFileName);
            //verify csv data
            cy.ReadCSVFileAndConvertObject(`${downloadFolderPath}/${latestFileName}`).then((csvData)=>{
              expect(rowLength).eq(csvData.length);
              let name= csvData[0]['Supplier Name'];
              expect(supplierName.toLowerCase()).eq(name.toLowerCase());
            });
          }
       });        
    }
}
export default MeleePage;