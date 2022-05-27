"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("homepage", function () {
    it("loads", function () {
        cy.visit("/");
        cy.get("h1").should("contain", "Hello there!");
    });
    it("has contact form", function () {
        cy.visit("/");
        cy.get('[data-testid="contactMeFormOpener"]').click();
        cy.get('input[name="name"]').type("john");
        cy.get('input[name="email"]').type("john@john.com");
        cy.get("textarea").type("hi from john");
        cy.get('button[type="submit"]').click();
        cy.get('div[data-testid="successIndicator"] > p').should("be.be.visible");
    });
});
describe("routes", function () {
    it("contactMe loads", function () {
        cy.visit("/contactMe");
    });
    it("blog loads", function () {
        cy.visit("/blog");
        cy.visit("/blog/list");
        cy.document().then(function (document) {
            document.querySelectorAll("a").forEach(function (a) {
                var _a;
                if ((_a = a.href) === null || _a === void 0 ? void 0 : _a.includes("mailto")) {
                    return;
                }
                cy.visit(a.href);
            });
        });
    });
});
