var faker = require("faker");

describe("Basic Authentication checks", function () {
  it("Can deactivate a user", function () {
    let password = "valid123Password@";
    let email = faker.internet.email();

    cy.register(email, password);

    cy.login(email, password, false);
    expect(cy.getCookie("refreshToken")).to.exist;

    sessionStorage.clear();
    cy.clearCookies();
    cy.clearCookie("refreshToken");
    cy.clearLocalStorage();

    cy.login("test@test.com", "valid123Password@", false);
    cy.visit("/admin/users/");

    cy.getTag("user-link").contains(email).click();

    cy.getTag("userForm-active").click();
    cy.getTag("submit-userForm").click();

    cy.wait(1000);

    cy.reload();
    sessionStorage.clear();
    cy.clearCookies();
    cy.clearCookie("refreshToken");
    cy.clearLocalStorage();

    cy.visit("/login");

    cy.getTag("login-email").type(email);
    cy.getTag("login-password").type(password);
    cy.getTag("submit-login").click();

    cy.wait(1000);
    cy.url().should("include", "/login");
  });

  it("Can change password", function () {
    let oldPassword = "valid123Password@";
    let newPassword = "valid123Password@123";
    let email = faker.internet.email();

    cy.register(email, oldPassword);
    cy.login(email, oldPassword, true);

    cy.visit("/account");

    cy.getTag("updatePassword-oldPassword").type(oldPassword);
    cy.getTag("updatePassword-password").type(newPassword);
    cy.getTag("updatePassword-passwordConfirm").type(newPassword);

    cy.getTag("submit-updatePassword").click();

    sessionStorage.clear();
    cy.clearCookies();
    cy.clearCookie("refreshToken");
    cy.clearLocalStorage();
    cy.reload();

    cy.visit("/login");
    cy.getTag("login-email").type(email);
    cy.getTag("login-password").type(oldPassword);
    cy.getTag("submit-login").click();

    cy.wait(1000);
    cy.url().should("include", "/login");

    cy.login(email, newPassword, true);
  });
});
