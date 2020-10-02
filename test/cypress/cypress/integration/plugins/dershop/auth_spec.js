var faker = require("faker");

describe("Basic Authentication checks", function () {

  it("Can deactivate a user", function () {
    let password = "valid123Password@";
    let email = faker.internet.email();

    cy.log("Register a user & Login");
    cy.visit("/register");

    cy.getTag("register-firstName").type(faker.name.firstName())
    cy.getTag("register-lastName").type(faker.name.lastName())
    cy.getTag("register-email").type(email)
    cy.getTag("register-password").type(password)
    cy.getTag("register-passwordConfirm").type(password)

    cy.getTag("register-submit").click()
    cy.url().should("include", "/login");

    cy.login(email, password);
    cy.url().should("eq", Cypress.config().baseUrl + "/");

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

  it("Can see & change account settings", function () {
    let password = "valid123Password@";
    let email = faker.internet.email();
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();

    cy.log("Register a user & Login");
    cy.visit("/register");

    cy.getTag("register-firstName").type(firstName)
    cy.getTag("register-lastName").type(lastName)
    cy.getTag("register-email").type(email)
    cy.getTag("register-password").type(password)
    cy.getTag("register-passwordConfirm").type(password)

    cy.getTag("register-submit").click()
    cy.url().should("include", "/login");

    cy.login(email, password);

    cy.visit("/account")

    cy.getTag("profile-firstName").invoke("val").should("eq", firstName)
    cy.getTag("profile-lastName").invoke("val").should("eq", lastName)
    cy.getTag("profile-email").invoke("val").should("eq", email)

    let newEmail = faker.internet.email();
    let newFirstName = faker.name.firstName();
    let newlastName = faker.name.lastName();

    cy.getTag("profile-firstName").clear().focus().type(newFirstName)
    cy.getTag("profile-lastName").clear().focus().type(newlastName)
    cy.getTag("profile-email").clear().focus().type(newEmail)

    cy.getTag("submit-profile").click()
    cy.wait(1000)

    cy.reload()

    cy.getTag("profile-firstName").invoke("val").should("eq", newFirstName)
    cy.getTag("profile-lastName").invoke("val").should("eq", newlastName)
    cy.getTag("profile-email").invoke("val").should("eq", newEmail)
    cy.getTag("identity-email").first().invoke("text").should("eq", newEmail)
  })
});
