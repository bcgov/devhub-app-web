describe('Journey Page Specs', () => {
  beforeEach(() => cy.visit('/'));
  describe('Arriving on the journey page', () => {
    it('navigates to journey page when clicking journey nav link', () => {
      cy.get('nav a[href="/journeys"]').click();
      cy.url().should('include', '/journeys');
    });

    it('navigates to journey by url', () => {
      cy.visit('/journeys');
    });
  });

  describe('Experiencing the journey page', () => {
    it('Can view a list of journeys', () => {
      cy.visit('/journeys');
      cy.log('verifying there are journeys');
      cy.contains(/Agile Delivery Journey/i);
    });
  });

  describe('View toggles', () => {
    it('can view journeys as a list from the url', () => {
      cy.visit('/journeys?v=list');
      cy.getByTestId('journey-page-view-list');
    });

    it('can view journeys as a card from the url', () => {
      cy.visit('/journeys?v=card');
      cy.getByTestId('journey-page-view-card');
    });

    it('can view journeys as a list and go back to cards', () => {
      cy.visit('/journeys');
      cy.log('ensuring no query param was set initially for view');
      cy.location('search').should('be', '');

      cy.log('we should see cards based on previous test');
      cy.getByTestId('journey-page-view-card');
      cy.getByTestId('journey-page-view-toggle')
        .parent()
        .click();

      cy.location('search').should('be', '?v=list');

      cy.log('there should be a list of journeys');
      cy.getByTestId('journey-page-view-list');

      cy.log('caret should not be rotated when not expanded');
      cy.getByTestId('table-of-contents-Agile Delivery Journey')
        .should('have.css', 'transform')
        .and('be', 'rotate(0deg)');

      cy.contains(/Agile Delivery Journey/i).click();

      cy.log('caret should be rotated when  expanded');
      cy.getByTestId('table-of-contents-Agile Delivery Journey')
        .should('have.css', 'transform')
        .and('be', 'rotate(90deg)');

      cy.contains(/Agile Delivery Journey/i)
        .parents('li')
        .contains(/Alignment/i);

      cy.log('toggling again to view cards');
      cy.getByTestId('journey-page-view-toggle')
        .parent()
        .click();

      cy.location('search').should('be', '?v=cards');
      cy.getByTestId('journey-page-view-card');
    });
  });
});
