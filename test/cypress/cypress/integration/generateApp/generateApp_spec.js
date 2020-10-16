describe("Check our generated app is accessible", function () {
  it("Can see index route route", function () {
    cy.visit("/");
    cy.contains("Welcome to corejam");
    //More
  });
});
