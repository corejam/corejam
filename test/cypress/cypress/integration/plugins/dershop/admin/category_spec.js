var faker = require("faker");

describe("Admin - Categories", function () {
  it("Can see category list", function () {
    return;
    cy.visit("/admin/categories");
    cy.getTag("categoryCell").its("length").should("be.gt", 1);
  });

  it("Can edit a a category", function () {
    return;
    cy.log("Implement");
  });
});
