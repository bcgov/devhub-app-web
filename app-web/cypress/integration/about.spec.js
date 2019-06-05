describe('About Page', () => {
  it('navigates to the devhub repo issues page when clicking on the link at the bottom', () => {
    cy.visit('/about')
      .getByText(/you can raise an issue within the/i)
      .get('a')
      .should('contain', 'Devhub Repository');
  });
});
