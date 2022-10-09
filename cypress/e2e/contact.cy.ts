import { UserProfile } from "@prisma/client";

describe("contact form button", () => {
  it("reveals contact form when clicked", async () => {
    cy.visit("/");
    cy.contains("Contact Me").click();
    cy.contains("Name").type("Joe Appleseed");
    cy.contains("Email").type("joe@joe.com");
    cy.contains("Message").type("INTEGRATION_TEST_SENTINEL");
    cy.contains("Submit").click();

    cy.task("getProfile", { email: "joe@joe.com" }).then(
      (profile: UserProfile) => {
        expect(profile.name).equal("Joe Appleseed");
      }
    );
  });
});
