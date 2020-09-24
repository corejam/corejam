var faker = require("faker");

describe("Basic Authentication checks", function () {

  it("Can deactivate a user", function () {
    let password = "valid123Password@";
    let email = faker.internet.email();

    cy.log("Register a user & Login");
    cy.visit("/register");

    cy.getTag("register-email").type(email)
    cy.getTag("register-password").type(password)
    cy.getTag("register-passwordConfirm").type(password)

    cy.getTag("register-submit").click()
    cy.url().should("include", "/login");

    cy.login(email, password);
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.visit("/index")
    cy.getTag("identity-email").invoke("text").should("be.equal", email)
    expect(cy.getCookie('refreshToken')).to.exist;

    sessionStorage.clear()
    cy.clearCookies()
    cy.clearCookie("refreshToken")
    cy.clearLocalStorage()

    cy.login("test@test.com", "valid123Password@")
    cy.visit("/admin/users");

    cy.getTag("user-link").contains(email).click()

    cy.getTag("userForm-active").click()
    cy.getTag("user-form-submit").click()

    cy.wait(1000)

    cy.reload();
    sessionStorage.clear()
    cy.clearCookies()
    cy.clearCookie("refreshToken")
    cy.clearLocalStorage()

    cy.visit("/login")

    cy.getTag("login-email").type(email)
    cy.getTag("login-password").type(password)
    cy.getTag("submit-login").click()

    cy.wait(1000)
    cy.url().should('include', '/login')
  });
});
