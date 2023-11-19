describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("has all necessary UI elements", () => {
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
    cy.get('div[id="login-error"]').should("be.visible");
    cy.get('button[icon="google-icon"]').should("be.visible");
    cy.get('button[icon="facebook-icon"]').should("be.visible");
    cy.get('button[icon="apple-icon"]').should("be.visible");
  });

  it("logs in successfully", () => {
    cy.get('input[placeholder="Email"]').type("test@test.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/deposit");
  });

  it("shows an error for invalid login", () => {
    cy.get('input[placeholder="Email"]').type("notcorrect@test.com");
    cy.get('input[placeholder="Password"]').type("notapassword");
    cy.get('button[type="submit"]').click();
    cy.get("#login-error").should("have.class", "opacity-100");
  });
});
