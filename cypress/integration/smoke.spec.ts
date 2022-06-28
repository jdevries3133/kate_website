describe("homepage", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Hello there!");
  });
  it("has contact form", () => {
    cy.visit("/");

    cy.get('[data-testid="contactMeFormOpener"]').click();
    cy.get('input[name="name"]').type("john");
    cy.get('input[name="email"]').type("john@john.com");
    cy.get("textarea").type("hi from john");
    cy.get('button[type="submit"]').click();
    cy.get('div[data-testid="successIndicator"] > p').should("be.be.visible");
  });
});

describe("routes", () => {
  it("admin loads", () => {
    cy.visit("/admin");
  });
  it("blog loads", () => {
    cy.visit("/blog");
    cy.visit("/blog/list");
    cy.document().then((document) => {
      document.querySelectorAll("a").forEach((a) => {
        if ((a.href as string | undefined)?.includes("mailto")) {
          return;
        }
        cy.visit(a.href);
      });
    });
  });
});

export {};
