describe('Authenticating', () => {
  it('shows the logout button when there is a valid local storage key', () => {
    cy.storeTokenInLocal();

    cy.visit('/');

    cy.getByTestId('auth.logout');
  });
});
