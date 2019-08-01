describe('Home Page Specs', () => {
  beforeEach(() => cy.visit('/'));
  describe('Arriving on the homepage', () => {
    it('navigates to home page when clicking on banner', () => {
      cy.getByTestId('header.govlogo.banner');
      cy.url().should('include', '/');
    });
  });
});
