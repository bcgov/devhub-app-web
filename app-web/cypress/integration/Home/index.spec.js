/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
describe('Home Page Specs', () => {
  beforeEach(() => cy.visit('/'));

  describe('Arriving on the homepage', () => {
    it('navigates to home page when clicking on banner', () => {
      cy.getByTestId('header.govlogo.banner');
      cy.url().should('be', 'http://0.0.0.0');
    });

    it('navigates to about page', () => {
      cy.getByTestId('about-devhub').click();
      cy.contains(/Welcome to the DevHub/i)
    });

    it('allows interaction with the fair use modal', () => {
      cy.get('button').contains(/fair use/i).click();
      cy.getByTestId('disclaimer-modal').should('be.visible');
      cy.wait(600);
      cy.getByTestId('disclaimer-button').click();
      cy.getByTestId('disclaimer-modal').should('not.be.visible');
    });

    describe('Popular Topic', () => {
      it('has the popular topic, when clicking on the title it navigates to the first page in the topic', () => {
        const topic = cy.getByTestId('topic-preview-popular-topic');;
        topic.find('[data-testid="topic-preview-title-link"]').click();
        cy.url().should('match', /topic\/popular\/\w+/i);
      });
  
      it('has the popular topic, when clicking on the chevron link it navigates to the first page in the topic', () => {
        const topic = cy.getByTestId('topic-preview-popular-topic');;
        topic.find('[data-testid="topic-preview-chevron-link"]').click();
        cy.url().should('match', /topic\/popular\/\w+/i);
      });
      
      it('navigates to the card within the popular topic', () => {
        const topic = cy.getByTestId('topic-preview-popular-topic');;
        topic.find('[data-testid="carousel-card"]').first().click();
        cy.url().should('match', /topic\/popular\/\w+/i);
      });
    });
    
    describe('Featured Topic', () => {
      it('has the featured topic,  when clicking on the title it navigates to the first page in the topic', () => {
        const topic = cy.getByTestId('topic-preview-featured-topic');
        topic.find('[data-testid="topic-preview-title-link"]').click();
        cy.url().should('match', /topic\/featured\/\w+/i);
      });

      it('has the featured topic,  when clicking on the chevron link it navigates to the first page in the topic', () => {
        const topic = cy.getByTestId('topic-preview-featured-topic');
        topic.find('[data-testid="topic-preview-chevron-link"]').click();
        cy.url().should('match', /topic\/featured\/\w+/i);
      });

      it('navigates to the card within the featured topic', () => {
        const topic = cy.getByTestId('topic-preview-featured-topic');;
        topic.find('[data-testid="carousel-card"]').first().click();
        cy.url().should('match', /topic\/featured\/\w+/i);
      });
    });

    describe('Primary Navigation', () => {
      it('navigates to resource type pages and topics', () => {
        cy.getByTestId('navbar-link').contains('Topics').click();
        cy.url().should('match', /\/topics/);
        cy.visit('/');
        cy.getByTestId('navbar-link').contains('Tools').click();
        cy.url().should('match', /\/self-service-tools/);
        cy.visit('/');
        cy.getByTestId('navbar-link').contains('Components').click();
        cy.url().should('match', /\/components/);
        cy.visit('/');
        cy.getByTestId('navbar-link').contains('GitHub Repositories').click();
        cy.url().should('match', /\/repositories/);
        cy.visit('/');
        cy.getByTestId('navbar-link').contains('Documentation').click();
        cy.url().should('match', /\/documentation/);
        cy.visit('/');
        cy.getByTestId('navbar-link').contains('Events').click();
        cy.url().should('match', /\/events/);
      });
    })
  });

});
