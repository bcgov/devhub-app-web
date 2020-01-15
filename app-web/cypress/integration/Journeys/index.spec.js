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

  describe('experiencing the journey page', () => {
    it('Can view a list of journeys', () => {
      cy.visit('/journeys');
      cy.log('verifying there are journeys');
      cy.contains(/Agile Delivery Journey/i);
    });
  });

  describe('View toggles', () => {
    it('can view journeys as a list', () => {
      cy.visit('/journeys');
      cy.url().contains(/journeys/i);
      cy.getByTestId('journey-page-view-toggle');
    });
  });
});
