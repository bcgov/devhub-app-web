describe('Popular Topic', () => {
  beforeEach(() => cy.visit('/topic/popular'));
  // asserting navigation works
  [
    { path: '/', testId: 'nav.home', displayName: 'Home' },
    { path: '/topics', testId: 'nav.topics', displayName: 'Topics' },
    { path: '/components', testId: 'nav.components', displayName: 'Components' },
    {
      path: '/repositories',
      testId: 'nav.github.repositories',
      displayName: 'Github Repositories',
    },
    { path: '/documentation', testId: 'nav.documentation', displayName: 'Documentation' },
    { path: '/events', testId: 'nav.events', displayName: 'Events' },
    { path: 'self-service-tools', testId: 'nav.tools', displayName: 'Tools' },
  ].forEach(({ testId, displayName, path }) => {
    it(`Clicking ${displayName} button and asserting it navigates to ${path}`, () => {
      cy.wait(250);
      cy.get(`[data-testid='${testId}']`).click();
      cy.url().should('be', path);
    });
  });

  it('shows an entry page at /topic/popular that navigates to the first topic resource when clicked', () => {
    const markdownBodyTestId = `[data-testid='dynamic.topic.markdown.body']`;
    const navLinkTestId = `[data-testid='sidepanel.topic.navigation'] a`;
    const anchor = cy.get(markdownBodyTestId).contains(/Get Started/i);

    anchor.click();
    // there is a redirect that occurs here that we want to wait for incase its slow

    cy.get(navLinkTestId)
      .first()
      .should('have.attr', 'href')
      .then(href => {
        cy.wait(100);
        cy.url().should('include', href);
      });

    cy.get(markdownBodyTestId).should('not.contain', /Get Started/i);

    cy.log('Checking the github issue link is available');

    cy.get(markdownBodyTestId)
      .get(`[data-testid='resource.actions.issue']`)
      .should('have.attr', 'href')
      .and('match', /https:\/\/(www\.)?github.com\/(\w+|-+)+\/(\w+|-+)+\/issues\/new/i);

    cy.log('Checking clicking on a navigation item');

    cy.get(navLinkTestId)
      .eq(1)
      .click()
      .should('have.attr', 'href')
      .then(href => {
        cy.url().should('include', href);
      });
  });
});
