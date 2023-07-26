class HomePage{

    /**======================Locators======================== */
 
    getProfilePicture(){
        return cy.get('div.profile--picture')
    }
    getProfileName(){
        cy.get('div.profile--picture').trigger('mouseover')
        return cy.get('div.sc-cSYcjD.blNvvf.name_tag')
    }
    getNavigationBar(){
        return cy.get('#admin_right_sidebar')
    }
    getAddStoneHeading(){
        return cy.get('div.sc-dvpmds.LBnJW>strong')
    }
    getActiveCustomTab(){
        return cy.xpath("//div[contains(@class,'custom_tab')]//a[@aria-current='page']")
    }
    getSelectAllCheckbox(){
        return cy.get("span[title='select all checkbox']")
    }
    getTextTotalItems(){
        return cy.get('div.text_total__items')
    }
    getSelfConfirmPOCheckbox(){
        return cy.get('#self__confirm__po__switch-id')
    }
    getPurchaseOrderLink(){
        return cy.get('#table__body>div:nth-child(2)>div:first-child a');
    }
    getOrderOverviewTitle(){
        return cy.get('strong.order-overview__title');
    }

    /**======================Actions======================== */

    selectNavigationBarModule(label){
        this.getNavigationBar().trigger('mouseover');
        cy.get('div.nav__item_content').find('span').each(($el)=>{  
            if($el.text().trim()===label){
                cy.log($el.text())
                cy.wrap($el).click()
            }
        })        
    this.getNavigationBar().trigger('mouseout')   
    }

    selectCustomerFromFilterDropdown(){
        cy.get('button.filter_by__main-btn').click();
        cy.xpath("//label[text()='Customer']/../..//input").type("Taylor & Hart",{force: true})
        cy.xpath("//div[@role='list']/div/button[text()='Taylor & Hart']").click();
        cy.get("button[class$='apply']").click();
    }
    verifyActiveCustomTab(activeTab){
        this.getActiveCustomTab().should('contain',activeTab)
    }

    verifyTotalCountOfPurchaseOrderWhenSelectingAllCheckbox(){
        
        // Get Total Count of Purchase Order
        let totalPurchaseOrderCount=0;
        this.getActiveCustomTab().then(($el)=>{
            cy.getNumberPatternFromString($el.text()).then((number)=>{
                totalPurchaseOrderCount=number;
            })            
        })

        // Get PO Count when click on All Checkbox
        let count1=0;
        this.getSelectAllCheckbox().click();
        this.getTextTotalItems().then(($el)=>{
            cy.getNumberPatternFromString($el.text()).then((number)=>{
                count1=number;
            })             
        })

        // Get PO Count when click on Self-confirmed Purchase Orders
        let count2=0;
        this.getSelfConfirmPOCheckbox().click();
        this.getSelectAllCheckbox().click();
        this.getTextTotalItems().then(($el)=>{
            cy.getNumberPatternFromString($el.text()).then((number)=>{
                count2=number;
 
                // Verify Total Purchase Order count
                expect(totalPurchaseOrderCount).to.equal(count1+count2)                      
            }) 
        })

    }

    openOrderDetailInNewTabVerifyOrderNumber(){
      let orderNumber="";
      let currentUrl="";

      cy.url().then((url)=>{
        currentUrl=url;
        this.selectCustomerFromFilterDropdown();
        this.getPurchaseOrderLink().find('span.order-overview__order-number').then(($el)=>{
             orderNumber=$el.text();
             cy.log("OrderNumber is :" + orderNumber)
        })
 
        this.getPurchaseOrderLink().then((ele)=>{
             let newUrl= ele.prop('href');
             cy.visit(newUrl);
             cy.wait(5000);
             this.getOrderOverviewTitle().should('contain.text',orderNumber);
             cy.go('back');
             cy.wait(5000);
             cy.url().should('eq',currentUrl);
        })
 
      });

    }
}
export default HomePage;