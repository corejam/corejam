/*
var faker = require("faker");

describe("Admin - User", function () {
  it("Can see user list", function () {
    return;
    cy.visit("/admin/users");
    cy.wait(1000);
    cy.get("auth-admin-user-list").shadowFind("corejam-base-link").its("length").should("be.gt", 1);
  });

  it("Can edit a user", function () {
    cy.visit("/admin/users");

    cy.wait(1000);

    //Select random user and store id, firstname, lastname
    cy.shadowGet("auth-admin-user-list")
      .shadowFind("corejam-base-link")
      .shadowFirst()
      .shadowFind("corejam-type")
      .shadowClick();

    cy.url().should("include", "/edit/");

    let newEmail = faker.internet.email();

    //Edit user and submit.
    cy.getTag("email").clear().type(newEmail);
    cy.getTag("submit").first().click();
    cy.wait(1000); //Currently need these until cypress supports Fetch API

    cy.reload();
    cy.contains(newEmail);

    //Go back to list and validate our new inputs match the list
    cy.go("back");
    cy.contains(newEmail);
  });

  it("Can Add a user", function () {
    return;
    cy.visit("/admin/users/add");

    let newEmail = faker.internet.email();

    cy.getTag("email").clear().type(newEmail);

    cy.getTag("submit").click();
    cy.url().should("include", "/edit/");

    cy.contains(newEmail);

    cy.visit("/admin/users");
    cy.wait(1000);
    cy.contains(newEmail);
  });
});
*/
