Cypress.Commands.add("login", () => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: "Test User",
      email: "test@test.com",
      token: "1234567890",
    })
  );
});
