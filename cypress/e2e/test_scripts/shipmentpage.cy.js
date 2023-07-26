/// <reference types="cypress" />
import LoginPage from "../page_objects/LoginPage";
import HomePage from "../page_objects/HomePage";
import ShipmentPage from "../page_objects/ShipmentPage";

describe('Shipment Page Test',()=>{
    const hp = new HomePage();
    const sp = new ShipmentPage();
    let loginData;
    let shipmentPageData;

    before(()=>{
        cy.fixture("test_data/loginpage.json").then(($data)=>{
            loginData=$data;
        })
        cy.fixture("test_data/shipmentpage.json").then(($data)=>{
            shipmentPageData=$data;
        })
    })

    beforeEach(()=>{
        cy.visit("https://website-melee.nivodaapi.net/");     
    })

    // it('DownloadCommercialInvoiceExcelAndVerifyInvoicePrice',()=>{
    //     cy.loginToNivoda(loginData.adminUsername,loginData.password)
    //     hp.selectNavigationBarModule(shipmentPageData.menuLabel)
    //     hp.selectNavigationBarModule(shipmentPageData.subMenuLabel)
    //     cy.wait(20000);
    //     sp.DownLoadCommercialInvoiceExcelFile(shipmentPageData.invoiceNo)
    // })

    it('TC09_Handle New Browser Window',()=>{
        cy.loginToNivoda(loginData.adminUsername,loginData.password)
        hp.selectNavigationBarModule(shipmentPageData.menuLabel)
        hp.selectNavigationBarModule(shipmentPageData.subMenuLabel)
        cy.wait(20000);      
        sp.handleNewBrowserWindow();
    })

})