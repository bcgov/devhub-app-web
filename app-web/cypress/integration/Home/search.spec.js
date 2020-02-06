describe('Searching from homepage', () => {
  const infoBoxText =
    'You can view search results from applications like Rocket.Chat, Github or Documize when logged in.';
  beforeEach(() => {
    cy.visit('/');
  });

  it.skip('Shows topics when there are no searches or searches are invalid', () => {
    cy.getByTestId('topics-container');
    cy.visit('/?q=');
    cy.getByTestId('topics-container');

    cy.visit(`/?q=${decodeURIComponent('  ')}`);
    cy.getByTestId('topics-container');

    cy.log('ensuring searching has the same effect in test');
    cy.visit('/');
    cy.contains('button', /search/i).click();
    cy.getByTestId('topics-container');

    cy.visit('/');
    cy.log('The search input enters three white spaces');
    cy.getByTestId('searchbar-input').type('   ');
    cy.contains('button', /search/i).click();
    cy.getByTestId('topics-container');
    cy.log('The search input should be trimmed to zero whitespace characters');
    cy.location('search').should('be', '?q=');
  });

  it.skip('searches by pressing search button and provides feedback that more search results can be obtained when logging on', () => {
    cy.log('ensuring algolia brand is visible');
    cy.getByTestId('Masthead.algolia');
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

  it.skip('searches by pressing enter and provides feedback that more search results can be obtained when logging on', () => {
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('openshift{enter}');

    cy.log('ensuring query param loads in url');
    cy.url().should('include', '?q=openshift');

    cy.getByTestId('resource-preview-container').should('exist');
  });

  it.skip('can navigate to a card from a search', () => {
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('what is openshift{enter}');

    cy.getByTestId('resource-preview-container').should('exist');
    cy.log("clicking on 'What Is Openshift?' card");

    cy.contains(/what is openshift\?/i).click();

    cy.url().should('eq', 'http://localhost:8000/What-Is-OpenShift');
  });

  it.skip('searches by a direct navigation', () => {
    cy.visit('/?q=what%20is%20openshift%3F');
    cy.getByTestId('resource-preview-container').should('exist');
    cy.contains(/what is openshift\?/i);
  });

  it.skip('shows feedback when no results are found', () => {
    cy.log('entering openshift in search bar');
    cy.getByTestId('searchbar-input').type('what is openshifasdfas123t{enter}');
    cy.log('ensuring algolia brand is still visible');
    cy.getByTestId('Masthead.algolia');
    cy.contains(/No resources found :\(/i);
  });

  it.skip('can toggle search filters correctly', () => {
    cy.log('entering openshift as search since it gives a lot of results');
    cy.visit('?q=openshift');
    cy.log('Result count pill should be visible');
    cy.getByTestId('ui-pill').contains(/All \d+ Results/i);

    cy.log('Filter Pills should exist');

    cy.get('[data-testclass="resource-preview-pill"]')
      .should(pills => {
        expect(pills.length).to.be.greaterThan(1);
      })
      .first()
      .as('firstFilterPill')
      .click();

    cy.get('@firstFilterPill')
      .should('have.attr', 'data-resourceType')
      .then(resourceType => {
        cy.log(
          'asserting number of results based on if the results from the filter are beyond the max results showed',
        );
        const cards = Cypress.$(`article[data-resourceType="${resourceType}"]`);

        expect(cards.length)
          .to.be.greaterThan(0)
          .and.to.be.lessThan(18);
      });
  });
});

describe('Searching from /components', () => {
  it.skip('goes to components and searches ', () => {
    cy.visit('/components');
    cy.log('ensuring algolia brand is visible');
    cy.getByTestId('CardContainer.algolia');

    cy.log('there should be cards to begin with');
    cy.get("[data-testclass='card'").should(cards => {
      expect(cards.length).to.be.greaterThan(0);
    });
    cy.log('entering header in search bar');
    cy.getByTestId('searchbar-input').type('header');

    cy.contains('button', /search/i).click();

    cy.log('ensuring query param loads in url');
    cy.url().should('include', '?q=header');

    cy.contains(/Header - Basic/i);
  });
});

describe('Searching Searchgate', () => {
  it.skip('shows results from rocketchat, documize and github when searching openshift and authenticated', () => {
    cy.log('programattically logging user in');
    cy.storeTokenInLocal();
    cy.visit('?q=openshift');
    cy.log('Results can take a while to load');
    cy.wait(5000);
    cy.getByTestId('searchgate.rocketChat');
    cy.getByTestId('searchgate.documize');
    cy.getByTestId('searchgate.github');
  });
});
