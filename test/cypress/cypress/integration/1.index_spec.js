describe("Generic Tests", function () {
  it("Check meta tags and title", function () {
    cy.visit("/");
    cy.title().should("eq", "DerShop - Serverless Ecommerce System");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "Open Source"
    );
  });
});
