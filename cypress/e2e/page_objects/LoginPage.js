class LoginPage{

    /**======================Locators======================== */
    getEmail(){
        return cy.get("input[placeholder='Email']");
    }

    getPassword(){
        return cy.get("input[placeholder='Password']");
    }

    getLoginBtn(){
        return cy.get("button[aria-label='login-button']");
    }

    getNivodaLogo(){
        return cy.get("img.login-icon");
    }

    getLoginErrorMsg(){
        return cy.get('p.text-danger')
    }
}
export default LoginPage;