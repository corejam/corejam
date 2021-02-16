describe("Canvas Tests", function () {
  /**
   * Start for our drag and drop canvas
   * Initially just do some basic dropping and check the raw html
   */
  it("Can drag and drop components", function () {
    cy.viewport(1000, 1000);

    cy.visit("/");
    cy.getTag("corejam-builder").click();
    cy.contains("Builder").click();

    cy.getTag("dragger-row").trigger("pointerdown");

    cy.getTag("drop").trigger("pointerover", 50, 0).trigger("pointerup");

    cy.getTag("dragger-headline").trigger("pointerdown");

    cy.getTag("drop").children().first().trigger("pointerover", "center").trigger("pointerup");

    cy.getTag("corejam-builder").click();

    cy.getTag("drop")
      .invoke("html")
      .then((html) => {
        const staticBody = html;
        cy.log(staticBody);
      });
  });
});
