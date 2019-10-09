describe('Dynamic Topic Specs', () => {
  describe('Arriving on the popular page', () => {
    it('has a github issue link at the bottom of the first page', () => {
      cy.visit('/');
      cy.getByTestId('topic-Popular').click();
      cy.log('checking url matches');
      cy.url().should('contain', '/topic/popular');
      cy.log('finding create issue link');
      cy.getByTestId('actions-issue')
        .should('have.attr', 'href')
        .and('match', /https:\/\/(www\.)?github.com\/bcgov\/\w+/);
    });
  });
});
