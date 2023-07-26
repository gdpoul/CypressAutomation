

class ShipmentPage{

    
    /**======================Locators======================== */

    getShipmentDetailTitle(){
        return cy.get('strong.order-overview__title')
    }
    getExportInvoicePrice(){
        return cy.xpath("//div[contains(@class,'table_headers')]/following-sibling::div/div/div[8]/strong")
    }
    getDownloadCommercialInvoiceBtn(){
        return cy.xpath("//button[text()='Download commercial invoice']");
    }
    addManagementFee(){
        return cy.xpath("//a[text()='Add Management Fee']");
    }
    
    /**======================Actions======================== */

    clickInvoiceViewBtnOfShipment(label){
        // let xpath1="//div[text()='"+label+"']/ancestor::div[contains(@class,'table_row__item')]/div[1]/a";
        // cy.xpath(xpath1).click();
        cy.get(':nth-child(4) > [style="width: 4%; justify-content: center;"] > a > .order-overview__search-wrapper > img').click();
    }

    DownLoadCommercialInvoiceExcelFile(invoiceNo){
        this.clickInvoiceViewBtnOfShipment(invoiceNo);
        this.getShipmentDetailTitle().should('contain.text','Shipment details');

        // get export invoice price
        let price;
        this.getExportInvoicePrice().then(($el)=>{
            var text = $el.text();
            var price = text.replace(/[$,]/g, '');
            cy.log("ExportInvoicePrice is :"+price);            
        })
        // download commercial invoice excel file      
        this.getDownloadCommercialInvoiceBtn().click();
        cy.wait(5000);
        cy.readFile('cypress/downloads/GB-NL20230717004.xlsx').should('exist')
    }

    handleNewBrowserWindow(){
        cy.xpath("(//img[@alt='search'])[3]").click();
        cy.wait(5000);

        this.addManagementFee().then((ele)=>{
            let newUrl= ele.prop('href');
            cy.visit(newUrl);
            cy.wait(5000);
            cy.get("input[type='number']").type(100); 

            cy.go('back');
            cy.wait(5000);
       })
    }
}
export default ShipmentPage;