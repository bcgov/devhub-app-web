describe('Popular Topic', () => {
  beforeEach(() => cy.visit('/topic/popular'));
  // asserting navigation works


  it('shows an entry page at /topic/popular that navigates to the first topic resource when clicked', () => {
    const markdownBodyTestId = `[data-testid='dynamic.topic.markdown.body']`;
    const anchor = cy.get(markdownBodyTestId).contains(/Get Started/i);

    anchor.click();
    // there is a redirect that occurs here that we want to wait for incase its slow
    cy.get(markdownBodyTestId).should('not.contain', /Get Started/i);

    cy.log('Checking the github issue link is available');

    cy.get(markdownBodyTestId)
      .get(`[data-testid='resource.actions.issue']`)
      .should('have.attr', 'href')
      .and('match', /https:\/\/(www\.)?github.com\/(\w+|-+)+\/(\w+|-+)+\/issues\/new/i);
  });
});
