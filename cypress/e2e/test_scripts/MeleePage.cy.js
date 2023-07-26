/// <reference types="cypress" />
import HomePage from "../page_objects/HomePage";
import MeleePage from "../page_objects/MeleePage";

describe('Melee Page Test',()=>{
    const hp = new HomePage();
    const mp=new MeleePage();
    let loginData;

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
    })

    beforeEach(()=>{
        cy.visit('https://website-melee.nivodaapi.net/');     
    })

    it('DownloadCSVFileAndVerifyData',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.selectNavigationBarModule("Melee Dashboard")
        hp.selectNavigationBarModule("Melee Orders")
        hp.selectNavigationBarModule("Repository page")
        cy.wait(20000);       
        mp.downloadCSVFileAndVerifyData("Mbk diamonds")

    })

})