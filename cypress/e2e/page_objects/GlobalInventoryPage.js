/// <reference types="cypress" />

class GlobalInventoryPage{

    /**======================Locators======================== */

    getTabName(label){
        return cy.xpath("//div[@class='top-row__status-row']//button[contains(normalize-space(),'"+label+"')]");
    }

    getMainFilterBtn(){
        return cy.get('button.filter_by__main-btn');
    }

    getFilterPageHeader(){
        return cy.get('div.top__header');
    }

    verifyFilterDropdownLabels(label){
        return cy.xpath("//div[contains(@class,'filter__item--title')]/label[text()='"+label+"']");
    }
    getFooterBtn(label){
        return cy.xpath("//div[contains(@class,'filter-footer')]//button[text()='"+label+"']");
    }
    getSupplierInput(){
        return cy.get("input#supplier_ids");
    }
    getLocationInput(){
        return cy.get("input#locations");
    }

     /**======================Actions======================== */

    verifyAllTabName(tabs){
        for(let i=0;i<tabs.length;i++){
            this.getTabName(tabs[i]).should('be.visible');
        }
    }

    verifyFilterPageElements(headerName,dropdownLabels,footerBtn){

        this.getMainFilterBtn().click();
        // verify Header Name
        this.getFilterPageHeader().should('have.text',headerName);

        // verify Dropdown labels
        for(let i=0;i<dropdownLabels.length;i++){
            this.verifyFilterDropdownLabels(dropdownLabels[i]).should('be.visible');
        }

        // verify footer Btn
        for(let i=0;i<footerBtn.length;i++){
            this.getFooterBtn(footerBtn[i]).should('be.visible');
        }
    }

    selectValueFromDropdownAndVerifyClearBtn(label){
        cy.xpath("//div[@role='list']/div/button[text()='"+label+"']").click();
        cy.wait(2000);
        cy.xpath("//div[@class='selected_items']/div/div").should('have.text',label)
        cy.get("div[class*='clear']").should('be.visible').click();
    }
    
    verifyDropdownValueIsSelectable(supplierName,locationName){
        
        this.getMainFilterBtn().click();
        // verify Supplier Option
        this.getSupplierInput().type(supplierName).then(()=>{
            this.selectValueFromDropdownAndVerifyClearBtn(supplierName);
        });
        // verify Location Option
        this.getLocationInput().type(locationName).then(()=>{
            this.selectValueFromDropdownAndVerifyClearBtn(locationName);
        })
    }
}
export default GlobalInventoryPage;