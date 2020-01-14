describe('Searching from homepage', () => {
  const infoBoxText =
    'You can view search results from applications like Rocket.Chat, Github or Documize when logged in.';

  it('searches by pressing search button and provides feedback that more search results can be obtained when logging on', () => {
    cy.visit('/');
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('openshift');

    cy.contains('button', /search/i).click();

    cy.log('ensuring query param loads in url');
    cy.url().should('include', '?q=openshift');

    cy.log('ensuring there is an info box the first time a user does a search');
    cy.getByTestId('Masthead.show')
      .should('contain', infoBoxText)
      .find('button')
      .click();

    cy.contains(infoBoxText).should('not.exist');

    cy.getByTestId('resource-preview-container').should('exist');
  });

  it('searches by pressing enter and provides feedback that more search results can be obtained when logging on', () => {
    cy.visit('/');
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('openshift{enter}');

    cy.log('ensuring query param loads in url');
    cy.url().should('include', '?q=openshift');

    cy.getByTestId('resource-preview-container').should('exist');
  });

  it('can navigate to a card from a search', () => {
    cy.visit('/');
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('openshift{enter}');

    cy.log("clicking on 'What Is Openshift?' card");

    cy.contains(/what is openshift\?/i).click();

    cy.url().should('eq', 'http://localhost:8000/What-Is-OpenShift');
  });
});
