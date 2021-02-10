describe("Signup-form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("accepts input", () => {
    const email = "test@gmail.com";
    cy.get(".MuiInputBase-input.MuiOutlinedInput-input")
      .type(email)
      .should("have.value", email);
  });

  context("Form submission", () => {
    it("enters an email in landing page", () => {
      const email = "test@gmail.com";
      cy.get(".MuiInputBase-input.MuiOutlinedInput-input").type(email);
      cy.get(".MuiButton-contained").click();
      cy.get("input[id=userName]").type("Tester", { force: true });
      cy.get("input[id=password]").type("password", { force: true });
      cy.get("input[id=confirmPassword]").type("password", { force: true });
      cy.contains("Next").click();
    });
  });

  context("User registration", () => {
    let countyList;
    it("load county data", () => {
      cy.request(
        "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list"
      ).then((response) => {
        countyList = response.body.data;
      });
    });

    it("enters profile details", () => {
      const email = "test@gmail.com";
      cy.get(".MuiInputBase-input.MuiOutlinedInput-input").type(email);
      cy.get(".MuiButton-contained").click();

      cy.get("input[id=userName]").type("Tester", { force: true });
      cy.get("input[id=password]").type("password", { force: true });
      cy.get("input[id=confirmPassword]").type("password", { force: true });
      cy.contains("Next").click();

      cy.get("input[id=firstName]").type("Tester", { force: true });
      cy.get("input[id=lastName]").type("Tester", { force: true });
      cy.get('[id="countyId"]').type("Cheshire").focus().click();
      // cy.get('[name="countyId"]')
      //   .children()
      //   .first()
      //   .then((el) => {
      //     cy.log(el.text());
      //   });
      //   should("have.text", "Bedfordshire");
      cy.get("input[id=postcode]").type("SE13 7FL", { force: true });
      cy.contains("Next").click();
      cy.contains("Submit").click();
    });
  });
});
