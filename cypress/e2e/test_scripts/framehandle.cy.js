
describe("Handling Frame",()=>{

    it('TC07_handled element inside frame',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
       
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find("a[href='mentorship']").eq(0).click();
        cy.wait(2000);
        cy.iframe().find('div.inner-box h1').should('have.text','Mentorship');
        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)

    })
})