describe("Check our generated app is accessible", function () {
  it("Can see test routes and click", function () {
    cy.visit("/")
    cy.contains("Welcome to corejam")
    cy.contains("Components")
    cy.contains("Routes")
    cy.get("app-welcome").get("a").first().click()
    cy.wait(1000)
    cy.get("app-root")

    //More
  });
});
