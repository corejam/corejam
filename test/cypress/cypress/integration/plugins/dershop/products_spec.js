describe("Products", function () {
  it("Product List is there", function () {
    cy.visit("/products");
    cy.getTag("produx-box").its('length').should("be.gte", 10);
  });

  it("Check Product Page", function () {
    cy.visit("/products");

    cy.getTag("product-list")
    cy.getTag("produx-box").its('length').then(($lenght) => {
      const listElementNumber = randomGenerator($lenght);
      cy.getTag('produx-box').eq(listElementNumber).click()
      cy.get("dershop-product")
    });

  });

  it("See order in account", function () {
    cy.login("test@test.com", "valid123Password@");

    cy.visit("/products");
    cy.getTag("product-list")
    cy.getTag("produx-box").its('length').then(($lenght) => {
      const listElementNumber = randomGenerator($lenght);
      cy.getTag('produx-box').eq(listElementNumber).click()

      cy.getTag("product-title").invoke("text").then((productTitle) => {
        cy.getTag("addToCart").click()
        cy.visit("/cart")
        cy.getTag("cartItemName").invoke("text").should("be.equal", productTitle)
        cy.getTag("checkout").click()
        cy.getTag("order-overview")
        cy.getTag("order-submit-address").click()
        cy.contains("Payment Method")
        cy.getTag("order-submit-payment").click()
        cy.getTag("buy-now").click()
        cy.url().should("contain", "/account/order");
        cy.get("dershop-order-view")
      })
    })
  });

  //Function to generate random number 
  const randomGenerator = (number) => {
    return Math.round(Math.random() * (number - 1))
  }
});
