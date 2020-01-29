describe('Topic Page Specs', () => {
  beforeEach(() => cy.visit('/'));
  describe('Arriving on the topic page', () => {
    it('navigates to topic page when clicking topic nav link', () => {
      cy.get('nav a[href="/topics"]').click();
      cy.url().should('include', '/topics');
    });

    it('navigates to topic by url', () => {
      cy.visit('/topics');
    });
  });

  describe('Experiencing the topic page', () => {
    it('Can view a list of topics', () => {
      cy.visit('/topics');
      cy.log('verifying there are topics');
      cy.contains(/Agile Delivery Process/i);
    });
  });

  describe('View toggles', () => {
    it('can view topics as a list from the url', () => {
      cy.visit('/topics?v=list');
      cy.getByTestId('topic-page-view-list');
    });

    it('can view topics as a card from the url', () => {
      cy.visit('/topics?v=card');
      cy.getByTestId('topic-page-view-card');
    });

    it('can view topics as a list and go back to cards', () => {
      cy.visit('/topics');
      cy.log('ensuring no query param was set initially for view');
      cy.location('search').should('be', '');

      cy.log('we should see cards based on previous test');
      cy.getByTestId('topic-page-view-card');
      cy.getByTestId('topic-page-view-toggle')
        .parent()
        .click();

      cy.location('search').should('be', '?v=list');

      cy.log('there should be a list of topics');
      cy.getByTestId('topic-page-view-list');

      cy.log('caret should not be rotated when not expanded');
      cy.getByTestId('table-of-contents-Agile Delivery Process')
        .should('have.css', 'transform')
        .and('be', 'rotate(0deg)');

      cy.contains(/Agile Delivery Process/i).click();

      cy.log('caret should be rotated when  expanded');
      cy.getByTestId('table-of-contents-Agile Delivery Process')
        .should('have.css', 'transform')
        .and('be', 'rotate(90deg)');

      cy.contains(/Agile Delivery Process/i)
        .parents('li')
        .contains(/Alignment/i);

      cy.log('toggling again to view cards');
      cy.getByTestId('topic-page-view-toggle')
        .parent()
        .click();

      cy.location('search').should('be', '?v=cards');
      cy.getByTestId('topic-page-view-card');
    });
  });

  describe('Accessing Resources', () => {
    it('can view items inside of the list', () => {
      cy.visit('/topics?v=list');
      cy.log('click on the first list item in the list');
      cy.getByTestId('topic-page-view-list')
        .children('li')
        .first()
        .click()
        .find('ul > li > a')
        .first()
        .click();

      cy.log('we should be on a topic page now');
      cy.getByTestId('github.topic.masthead');
    });
  });
});
