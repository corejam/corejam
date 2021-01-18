describe("Check our generated app is accessible", function () {
  it("Can see index route route", function () {
    cy.visit("/")
    
    //Make sure the SSR content matches the client visit
    cy.request("/").its('body').then(html => {
      cy.wrap(html).get("body").invoke("html").then(html => {
        const staticBody = html;

        cy.visit("/");
        cy.contains("Welcome to corejam");

        cy.get('body').invoke('html').then(html => {
          expect(html).to.equal(staticBody)
        })
      });
    })

    //Make sure we are not rendering duplicate elements
    cy.get("corejam-app").its("length").should("be.eq", 1)
    cy.get("corejam-router").its("length").should("be.eq", 1)
  });
});
