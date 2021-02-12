describe("Admin - Orders", function () {
  it("Can see orders list", function () {
    cy.login("test@test.com", "valid123Password@");
    cy.visit("/admin/orders");

    cy.getTag("order-link").selectNth(1).click();

    cy.url().should("include", "/order/view");
    cy.get("dershop-order-view");
  });
});
