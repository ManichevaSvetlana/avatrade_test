describe("Deposit Test", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/deposit");
  });

  it("allows input of payment card details", () => {
    cy.get('input[placeholder="Credit Card Number"]').type("1234567812345678");
    cy.get('input[placeholder="CVV"]').type("123");
    cy.get('input[placeholder="Expiry Date (MM/YY)"]').type("12/23");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("validates form fields before submitting", () => {
    cy.get('input[placeholder="Credit Card Number"]').type(" ").blur();
    cy.get('input[placeholder="CVV"]').type(" ").blur();
    cy.get('input[placeholder="Expiry Date (MM/YY)"]').type(" ").blur();
    cy.get(".text-red").should("have.class", "opacity-100");
  });

  it("successfully processes a deposit", () => {
    cy.get('input[placeholder="Credit Card Number"]').type("1234567812345678");
    cy.get('input[placeholder="CVV"]').type("123");
    cy.get('input[placeholder="Expiry Date (MM/YY)"]').type("12/23");
    cy.get('button[type="submit"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Deposit successful!");
    });
  });

  it("logs out successfully", () => {
    cy.get('div[id="logout-button"]').should("be.visible");
    cy.get('div[id="logout-button"]').click();
    cy.url().should("include", "/login");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });
});
