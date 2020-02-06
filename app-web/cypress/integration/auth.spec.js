describe('Authenticating', () => {
  it('shows the logout button when there is a valid local storage key', () => {
    cy.storeTokenInLocal();

    cy.visit('/');

    cy.getByTestId('auth.logout');
  });

  it('logs out the user when url has ?intention=LOGOUT', () => {
    cy.storeTokenInLocal();

    cy.visit('/');
    cy.wait(1000);
    cy.visit('/?intention=LOGOUT');
    cy.getByTestId('auth.login');
    // eslint-disable-next-line no-unused-expressions
    expect(window.localStorage.getItem('auth')).to.be.null;
  });
});
