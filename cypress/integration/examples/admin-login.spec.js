describe("Admin console", () => {
  it("login to admin console", () => {
    cy.visit("http://localhost:3000/#/admin");
    cy.get("input[id=standard-basic-email]").type("admin-mcw@gmail.com", {
      force: true,
    });
    cy.get("input[id=standard-basic-password]").type("password", {
      force: true,
    });
    cy.contains("Submit").click();
  });
});
