describe('Home Page Specs', () => {
  beforeEach(() => cy.visit('/'));
  describe('Arriving on the homepage', () => {
    it('navigates to home page when clicking on banner', () => {
      cy.getByTestId('header.govlogo.banner');
      cy.url().should('include', '/');
    });

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
  });
});
