import { UserProfile } from "@prisma/client";

describe("contact form button", () => {
  it("reveals contact form when clicked", async () => {
    cy.visit("/");
    cy.contains("Contact Me").click();
    cy.contains("Name").should("not.have.attr", "disabled");
    cy.contains("Name").type("Joe Appleseed");
    cy.contains("Email").should("not.have.attr", "disabled");
    cy.contains("Email").type("joe@joe.com");
    cy.contains("Message").should("not.have.attr", "disabled");
    cy.contains("Message").type("INTEGRATION_TEST_SENTINEL");
    cy.contains("Submit").click();

    cy.task("getProfile", { email: "joe@joe.com" }).then(
      (profile: UserProfile) => {
        expect(profile.name).equal("Joe Appleseed");
      }
    );
  });
  // TODO: it("prefills fields when the user is known")
  // something is wonky with cypress & session cookies such that this isn't
  // working
});
