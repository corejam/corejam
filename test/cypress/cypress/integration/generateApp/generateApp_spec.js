describe("Check our generated app is accessible", function () {
  it("Can see test routes and click", function () {
    cy.visit("/")
    cy.contains("Welcome to corejam")
    cy.contains("Routes")
    cy.get("app-welcome").get("a").first().click()
    cy.get("app-root").contains("Hi, this is Corejam World")
    //More
  });
});
