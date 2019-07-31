describe('Dynamic Topics - General', () => {
  it('redirects to 404 if dynamic topic name is invalid', () => {
    cy.visit('/topic/asdfkjhasdlf');

    cy.url().should('be', '404');
  });
});
