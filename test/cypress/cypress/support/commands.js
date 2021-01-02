// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getTag", (tag) => {
  return cy.get('[data-cy="' + tag + '"]');
});

Cypress.Commands.add("login", (email, password, expectIdentity = true) => {
  cy.visit("/login");
  cy.getTag("login-email").type(email)
  cy.getTag("login-password").type(password)
  cy.getTag("submit-login").click()

  cy.wait(1000);
  cy.url().should("eq", Cypress.config().baseUrl + "/");

  if (expectIdentity) cy.getTag("identity-email").invoke("text").should("be.equal", email)
});

Cypress.Commands.add("register", (email, password) => {
  cy.log("Register a user & Login");
  cy.visit("/register");

  cy.getTag("register-email").type(email);
  cy.getTag("register-password").type(password);
  cy.getTag("register-passwordConfirm").type(password);

  cy.getTag("submit-register").click();
  cy.url().should("include", "/login");
})

Cypress.Commands.overwrite('visit', (originalFn, element, text, options) => {
  originalFn(element, text, options)
  return cy.wait(1000)
})


Cypress.Commands.add("selectNth", { prevSubject: "element" }, (subject, pos) => {
  return cy
    .wrap(subject)
    .eq(pos)
    .then((e) => {
      return cy.wrap(e);
    });
});
