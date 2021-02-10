describe("App initialisation", () => {
  it.only("load county data", () => {
    cy.request(
      "https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list"
    ).then((response) => {
      const countyList = response.body.data;
    });
  });
});
