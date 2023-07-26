/// <reference types="cypress" />

class EnquiriesPage{

    /**======================Locators======================== */
    getTotalRows(){
        return cy.get('tbody tr')
    }
    getCertificateIdfromRows(){
        return cy.get('tbody tr td:nth-child(2)')
    }
    getEllipsisIcon(){
        return cy.get("tbody tr:nth-child(1) td:nth-child(12) span[title='Click to Open']");
    }    
    getProvideDetails(){
        return cy.get("button[title='Provide details']");
    }
    getProvideDetailPageHeading(){
        return cy.get('div.page_heading')
    }
    getProvideDetailSaveBtn(){
        return cy.get("button[title='Save enquiry details']")
    }

    getEllipsisHoldRequest(){
        return cy.get("div#table_rows div[role='rowgroup']:nth-child(1) div:nth-child(10) div")
    }
    getCloseBtn(){
        //button[text()='Close']
        return cy.get('button.action__cancel');
    }
    getConfirmBtn(){
        return cy.get('button.action__confirm')
    }
    getSuccessMsg(){
        return cy.get('span._terms-info>div')
    }
    getAcceptBtn(){
        return cy.get("button[title='Accept this hold request']")
    }
     /**======================Actions======================== */

    selectValueFromDropdown(label,value){
        cy.xpath("//span[text()='"+label+"']/..//input").type(value,{force: true})
        cy.xpath("//div[@role='listbox']/div[text()='"+value+"']").click();
        
    } 

    enterDiamondInfoInProvideDetailsPageAndVerifyCertId(labels,values) {

        // get total rows
        let beforeRows=0;
        this.getTotalRows().then(($rows)=>{
            beforeRows=$rows.length;
            cy.log("total rows before provide details :"+beforeRows)
        })

        this.getEllipsisIcon().click({force: true});
        this.getProvideDetails().click( {force: true});
        this.getProvideDetailPageHeading().should('contain.text','Provide Details')

        // copy certificate Id
        let certId;
        cy.get('div.description_box__cert>div:nth-child(1)').then(($el)=>{
            certId=$el.text().trim()
            cy.log(certId);
        })

        // Select Diamond Information
        for(let i=0;i<labels.length;i++){
            this.selectValueFromDropdown(labels[i],values[i])
        }

        // click saveBtn
        this.getProvideDetailSaveBtn().click()
        cy.wait(3000);

        // verify total rows after 
        this.getTotalRows().then(($rows)=>{
            let totalRows=$rows.length;
            cy.log("total rows after provide details :"+totalRows)
            expect(totalRows).to.equal(beforeRows-1)
        })

        // verify Certificate Id
        this.getCertificateIdfromRows()
            .should('not.contain', certId)

    }

    clickOnConfirmHoldRequestAndValidateSuccesMsg(expectedSuccessMsg){
        this.getEllipsisHoldRequest().click();
        this.getAcceptBtn().click();
        this.getConfirmBtn().click();

        // verifySuccessMsg
        this.getSuccessMsg().then(($el)=>{
            const ActualsuccessMsg=$el.text()
            cy.wait(2000);
            expect(ActualsuccessMsg).to.eq(expectedSuccessMsg);
        })
        this.getCloseBtn().click();
    }
}

export default EnquiriesPage;