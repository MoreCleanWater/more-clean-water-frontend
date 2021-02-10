describe("Water station", () => {
  it("creates water station", () => {
    cy.visit("http://localhost:3000/#/admin/users");
    cy.wait(2500);
    cy.visit("http://localhost:3000/#/admin/water-stations");
    cy.wait(5500);
    cy.contains("Add").click();
    cy.get('[id="countyId"]').type("Cheshire").focus().click();
    cy.get("input[id=postcode]").type("SE13 7FL", { force: true });
    cy.get("input[id=size]").type("100", { force: true });
    cy.get("input[id=capacity]").type("100", { force: true });

    cy.contains("Create").click();

    // .click({ force: true })
    // .find("Bedfordshire");
    // .focus();
    //   cy.get('[name="countyId"]').eq(1).click().find("input").focus();
    //   cy.contains("Bedfordshire").click({ force: true });
    // .type("Bedfordshire", { force: true });
    // .then((option) => {
    //   // Confirm have correct option
    //   cy.wrap(option).contains("Bedfordshire");

    //   option[0].click();

    //   // After click, mdc-select should hold the text of the selected option
    //   cy.get('[name="countyId"]').contains("Bedfordshire");
    // });

    // cy.get('[name="countyId"]')
    //   //   .children()
    //   .first()
    //   .then((el) => {
    //     cy.log(el.text());
    //   });
    // first().focus().should("have.value", "Cheshire");
    // cy.get('[id="countyId"]').each(($el, index, $list) => {
    //   //   cy.log($el.text);
    //   //   cy.log(index);
    //   cy.log($list);
    //   if ($el.text === "countyId") cy.wrap($el).click();
    // });
  });
});
