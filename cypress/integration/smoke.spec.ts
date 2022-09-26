describe("homepage", () => {
  it("loads", () => {
    cy.visit("/");
  });
});

describe("routes", () => {
  it("admin loads", () => {
    cy.visit("/admin");
  });
  it("blog loads", () => {
    cy.visit("/blog");
    cy.visit("/blog");
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
