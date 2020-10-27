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

  it("Check SSR is working", function () {

    cy.request("/").its('body').then(html => {
      cy.wrap(html).should("contain", "dershop-spotlight")
        .should("contain", "dershop-header")
        .should("contain", "dershop-footer")

    })

    cy.request("/products").its('body').then(html => {
      cy.wrap(html).should("contain", "dershop-header")
        .should("contain", "dershop-footer")
        .should("contain", "dershop-product-list")
        .should("contain", "dershop-product")
    })
  });

});
