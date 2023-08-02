/// <reference types="cypress" />
import HomePage from "../page_objects/HomePage";
import GlobalInventoryPage from "../page_objects/GlobalInventoryPage";

const hp = new HomePage();
const inventoryPage= new GlobalInventoryPage();
let loginData;
let inventoryPageData;

describe.skip('Global Inventory Page Test',()=>{

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
        cy.fixture("test_data/inventorypage.json").then(($data)=>{
            inventoryPageData=$data;
        })
    })

    beforeEach(()=>{
        cy.visit(Cypress.env("url"));  
        cy.loginToNivoda(loginData.adminUsername,loginData.password);
        hp.selectNavigationBarModule(inventoryPageData.menuLabel)
        cy.wait(40000);   
    })

    it('TC11_VerifyAllTabName',()=>{
        const tabs= inventoryPageData.tabName;
        inventoryPage.verifyAllTabName(tabs);      
    })
})

describe('Verify Filter Page',()=>{

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
        cy.fixture("test_data/inventorypage.json").then(($data)=>{
            inventoryPageData=$data;
        })
    })
    beforeEach(()=>{
        cy.visit(Cypress.env("url"));  
        cy.loginToNivoda(loginData.adminUsername,loginData.password);
        hp.selectNavigationBarModule(inventoryPageData.menuLabel)
        cy.wait(40000);   
    }) 
    
    it('TC12_Verify Filter Popup Page',()=>{
        const headerName =inventoryPageData.mainFilterHeader;
        const dropdownLabels=inventoryPageData.dropdownLabels;
        const footerBtn=inventoryPageData.footerBtn;
        inventoryPage.verifyFilterPageElements(headerName,dropdownLabels,footerBtn);
    })

    it('TC13_VerifyDropdownValueIsSelectable',()=>{
        const supplierName=inventoryPageData.supplierValue;
        const locationName=inventoryPageData.locationValue;
        inventoryPage.verifyDropdownValueIsSelectable(supplierName,locationName);
    })
})