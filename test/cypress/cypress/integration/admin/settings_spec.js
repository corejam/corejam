var faker = require("faker");

// describe("Admin - Settings", function() {
//   it("Update Settings", function() {
//     cy.visit("/admin/settings");

//     const seoTitle = faker.random.word();
//     const seoDescription = faker.random.words(3);
//     const adminEmail = faker.internet.email();

//     cy.getTag("seo.meta_title")
//       .clear()
//       .type(seoTitle);

//     cy.getTag("seo.meta_description")
//       .clear()
//       .type(seoDescription);

//     cy.getTag("general.admin_email")
//       .clear()
//       .type(adminEmail);

//     cy.getTag("submit").each((submit) => {
//       submit.click();
//     });
//     cy.wait(1000); //Currently need these until cypress supports Fetch API

//     cy.reload();
//     cy.wait(1000); //Currently need these until cypress supports Fetch API

//     cy.contains(seoTitle);
//     cy.contains(seoDescription);
//     //cy.contains(adminEmail);

//     //Check updated meta tags
//     cy.title().should("eq", seoTitle);
//     cy.get('head meta[name="description"]').should(
//       "have.attr",
//       "content",
//       seoDescription
//     );
//   });
// });
