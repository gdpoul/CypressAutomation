/// <reference types="cypress" />
import HomePage from "../page_objects/HomePage";
import EnquiriesPage from "../page_objects/EnquiriesPage";

describe('Enquiries Page Test',()=>{
    const hp = new HomePage();
    const ep = new EnquiriesPage();
    let loginData;
    let enquiriesPageData;

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
        cy.fixture("test_data/enquiriespage.json").then(($data)=>{
            enquiriesPageData=$data;
        })

    })

    beforeEach(()=>{
        cy.visit(Cypress.env("url"));
      
    })

    it("TC04_ProvideDimondDetailsInEnquiriesModuleAndVerify",()=>{
        const labels= enquiriesPageData.labels;
        const values= enquiriesPageData.values;
        
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.selectNavigationBarModule(enquiriesPageData.menuLabel)
        hp.selectNavigationBarModule(enquiriesPageData.subMenuLabel)
        cy.wait(20000)
        ep.enterDiamondInfoInProvideDetailsPageAndVerifyCertId(labels,values)
    })

    it('TC06_AcceptHoldRequestAndVerifyPopUpMsg',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.selectNavigationBarModule(enquiriesPageData.menuLabel)
        hp.selectNavigationBarModule(enquiriesPageData.HoldRequestData.subMenuLabel)
        cy.wait(20000)
        ep.clickOnConfirmHoldRequestAndValidateSuccesMsg(enquiriesPageData.HoldRequestData.SuccessMsg)
    })
    
})