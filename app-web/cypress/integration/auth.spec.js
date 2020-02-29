describe('Authenticating', () => {
  // now integrated with keycloak adapter. unsure how to integrate with sso for login since we use
  // a bcgov idp
  it.skip('shows the logout button when there is a valid local storage key', () => {
    cy.storeTokenInLocal();

    cy.visit('/');

    cy.getByTestId('auth.logout');
  });

  it.skip('logs out the user when url has ?intention=LOGOUT', () => {
    cy.storeTokenInLocal();

    cy.visit('/');
    cy.wait(1000);
    cy.visit('/?intention=LOGOUT');
    cy.getByTestId('auth.login');
    // eslint-disable-next-line no-unused-expressions
    expect(window.localStorage.getItem('auth')).to.be.null;
  });
});
