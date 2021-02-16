var faker = require("faker");

describe("Admin - Manufacturers", function () {
  it("Can see product list", function () {
    return;
    cy.visit("/admin/manufacturers");
    cy.getTag("manufacturerCell").its("length").should("be.gt", 1);
  });

  it("Can edit a a manufacturer", function () {
    return;
    cy.visit("/admin/manufacturers");

    //Select random user and store id, firstname, lastname
    cy.getTag("editManufacturer").then((links) => {
      cy.url().should("include", "/edit/");

      links[0].click();

      const newName = faker.company.companyName();
      const newUrl = faker.internet.url();

      //Edit user and submit.
      cy.getTag("name").clear().type(newName);

      cy.getTag("website").clear().type(newUrl);

      //TODO we need a better way of doing this
      cy.getTag("submit").first().click();
      cy.wait(1000); //Currently need these until cypress supports Fetch API

      cy.reload();

      cy.contains(newName);
      cy.contains(newUrl);

      //Go back to list and validate our new inputs match the list
      cy.go("back");
      cy.contains(newName);
    });
  });
});
