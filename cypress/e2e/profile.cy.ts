describe("profile page", () => {
  it("can visit profile page", () => {
    // 'login' by submitting the comment form
    cy.visit("/");
    cy.contains("Contact Me").click();
    cy.contains("Name").should("not.have.attr", "disabled");
    cy.contains("Name").type("Joe Applesod");
    cy.contains("Email").should("not.have.attr", "disabled");
    cy.contains("Email").type("joe2@joe.com");
    cy.contains("Message").should("not.have.attr", "disabled");
    cy.contains("Message").type("INTEGRATION_TEST_SENTINEL");
    cy.contains("Submit").click();

    cy.contains("Thanks, Joe Applesod!");

    cy.visit("/profile");
  });
});
