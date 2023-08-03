/// <reference types="cypress" />
import LoginPage from "../page_objects/LoginPage";
import HomePage from "../page_objects/HomePage";


describe("Login Page Test",()=>{

    const lp = new LoginPage();
    const hp = new HomePage();
    let loginData;

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
    })

    beforeEach(()=>{
        cy.visit(Cypress.env("url"));
    })

    it('TC01_Verify Login successful',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.getProfileName().then(($el)=>{
            const profileText=$el.text().trim();
            expect(profileText).to.equal(loginData.adminProfileText)
        })
    })

    it('TC02_LoginWithIncorrectCredsAndVerifyErrorMsg',()=>{
        lp.invalidLogin(loginData.adminUsername,loginData.invalidPass);
        lp.getLoginErrorMsg().should('have.text',loginData.loginErrorMsg);
    })
})