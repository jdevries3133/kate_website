import { Comment, UserProfile } from "@prisma/client";

describe("blog comment", () => {
  it("can be submitted", async () => {
    cy.visit("/blog");
    cy.get('[data-testid="post-link"]').first().click();
    cy.contains("Created:");
    cy.get('form [name="author"]').type("Person");
    cy.get('form [name="email"]').type("hi@hi.com");
    cy.get('form [name="content"]').type("hi");
    cy.contains("submit").click();

    cy.task("getAllComments").then((c) => {
      expect(c[0].content).equals("hi");
      cy.location().should((loc) =>
        expect(loc.pathname).to.include(c[0].postSlug)
      );
    });
  });
  it("causes user profile to be created if it does not exist", () => {
    cy.visit("/blog");
    cy.get('[data-testid="post-link"]').first().click();
    cy.contains("Created:");
    cy.get('form [name="author"]').type("New Person");
    cy.get('form [name="email"]').type("new_email@hi.com");
    cy.get('form [name="content"]').type("hi");
    cy.contains("submit").click();

    let profileId: number;
    cy.task("getProfile", { email: "new_email@hi.com" }).then(
      (profile: UserProfile) => {
        expect(profile.name).equals("New Person");
        expect(profile.email).equals("new_email@hi.com");
        profileId = profile.id;
      }
    );

    cy.task("getAllComments").then((c: Comment[]) => {
      const comment = c.reduce((acc, co) => {
        if (co.profileId === profileId) {
          return co;
        }
        return acc;
      }, undefined);
      expect(comment).exist;
    });
  });
});
