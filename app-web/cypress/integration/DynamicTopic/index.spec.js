describe('Dynamic Topic Specs', () => {
  describe('Arriving on the popular page', () => {
    it('can visit featured topics', () => {
      cy.visit('/');
      cy.contains('a', 'Featured').click();
      cy.log('checking url matches');
      cy.url().should('contain', '/topic/featured');
    });
  });
});
