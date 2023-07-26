/// <reference types="cypress" />
import LoginPage from "../page_objects/LoginPage";
import HomePage from "../page_objects/HomePage";

describe('Home Page Test',()=>{
    const lp = new LoginPage();
    const hp = new HomePage();
    let loginData;
    let homePageData;

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
        cy.fixture("test_data/homepage.json").then(($data)=>{
            homePageData=$data;
        })
    })
    beforeEach(()=>{
        cy.visit(Cypress.env("url"));
    })

    it('TC02_SelectNavigationBarModuleAndVerify',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.selectNavigationBarModule(homePageData.menuLabel)
        hp.selectNavigationBarModule(homePageData.subMenuLabel)

        hp.getAddStoneHeading().then(($el)=>{
            expect($el.text()).to.equal(homePageData.AddStonePageHeading)
        })    
    })

    it("TC05_SelectAllCheckboxOnPurchaseOrderAndValidateCount",()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password);
        cy.url().should('eq', homePageData.homePageUrl);
        hp.verifyActiveCustomTab('Purchase order');
        cy.wait(20000);
        hp.verifyTotalCountOfPurchaseOrderWhenSelectingAllCheckbox();
    })

    it('TC08_NewTabHandling',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password);
        cy.url().should('eq', homePageData.homePageUrl);
        cy.wait(20000);
        hp.openOrderDetailInNewTabVerifyOrderNumber();
    })
    
})