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
        lp.getEmail().type(loginData.adminUsername);
        lp.getPassword().type(loginData.password);
        lp.getLoginBtn().click();
        hp.getProfilePicture().should('be.visible')
        hp.getProfileName().then(($el)=>{
            const profileText=$el.text().trim();
            expect(profileText).to.equal(loginData.adminProfileText)
        })
    })

    it('TC02_LoginWithIncorrectCredsAndVerifyErrorMsg',()=>{
        lp.getEmail().type(loginData.adminUsername);
        lp.getPassword().type(loginData.invalidPass);
        lp.getLoginBtn().click();
        lp.getLoginErrorMsg().should('have.text',loginData.loginErrorMsg);
    })
})