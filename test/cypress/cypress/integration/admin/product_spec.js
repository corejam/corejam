/*
var faker = require("faker");

describe("Admin - Product", function () {
  it("Can edit a product", function () {
    cy.visit("/admin/products");
    cy.wait(1000)

    cy.shadowGet("corejam-box").shadowFind("corejam-base-link").shadowFind("corejam-type").shadowClick();

    cy.url().should("include", "/edit/");

    const newName = faker.commerce.productName();
    const newSku = faker.random.number();

    //Edit user and submit.
    cy.getTag("name").clear().type(newName);

    cy.getTag("sku").clear().type(newSku);

    //TODO we need a better way of doing this
    cy.getTag("submit").click()
    cy.wait(1000)

    cy.reload();

    cy.contains(newName);
    cy.contains(newSku);

    //Go back to list and validate our new inputs match the list
    cy.go("back");
    cy.wait(1000);
    cy.contains(newName);
  });

  it("Can Add a product", function () {
    cy.visit("/admin/products/add");

    const newName = faker.commerce.productName() + "addProduct";
    const newSku = faker.random.number();

    //Edit user and submit.
    cy.getTag("name").clear().type(newName);

    cy.getTag("sku").clear().type(newSku);

    cy.getTag("submit").click();
    cy.wait(1000)

    cy.url().should("include", "/edit/");

    cy.contains(newName);
    cy.contains(newSku);

    cy.visit("/admin/products");
    cy.contains(newName);
  });

  /*
  it("Can upload an image to a product", function () {
    cy.server();
    cy.route("POST", "https://api.cloudinary.com/v1_1/dkarrtvls/upload").as("cloudinary");

    cy.visit("/products");

    cy.shadowGet("dershop-product-list")
      .shadowFind("dershop-product-box")
      .shadowFirst()
      .shadowFind("corejam-base-link")
      .shadowFind("dershop-ui-type")
      .shadowClick();

    cy.shadowGet("dershop-product").shadowFind("dershop-image");

    cy.visit("/admin/products");

    //Select random user and store id, firstname, lastname
    cy.shadowGet("corejam-box #productEdit").shadowFind("corejam-type").shadowClick();

    cy.wait(1000)

    //Get upload component
    cy.getTag("dropzone")
      .attachFile("150.png", { subjectType: "drag-n-drop" })
      .then(() => {
        cy.wait("@cloudinary");
        cy.wait(1000)

        //Reload & see image
        cy.reload();
        cy.get("div").find("img").should("be.visible");
      });
  });
});*/
