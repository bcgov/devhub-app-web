// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('getByTestId', id => cy.get(`[data-testid='${id}']`));

const jwt = require('jsonwebtoken');

const SUPER_SECRET = 'foo';
/**
 * returns a valid JWT token
 * @returns {Object}
 */
const JWT = () => ({
  jti: '02aa7bcd-beb6-4d1f-8611-ec059e613ab3',
  exp: Date.now() + 10000,
  nbf: 0,
  iat: Date.now(),
  iss: 'https://sso.pathfinder.gov.bc.ca/auth/realms/devhub',
  aud: 'devhub-web',
  sub: '2fe15c36-72e7-48f1-97e3-9b988cf1c861',
  typ: 'ID',
  azp: 'devhub-web',
  nonce: Date.now() * Math.random(),
  auth_time: 15 * 60 * 1000, // 15 minutes in ms
  session_state: '79062782-167b-4551-9a3b-1289cde24f67',
  acr: '1',
  name: 'Joe Shmo',
  preferred_username: 'joe.shmo@github',
  given_name: 'Joe',
  family_name: 'Shmoe',
  email: 'joe.shmo@gmail.com',
});

Cypress.Commands.add('storeTokenInLocal', () => {
  return cy.clearLocalStorage().then(() => {
    const validJWT = JWT();
    const signedJWT = jwt.sign(JSON.stringify(validJWT), SUPER_SECRET);
    const localStorageValue = {
      idToken: {
        data: validJWT,
        bearer: signedJWT,
      },
    };

    window.localStorage.setItem('auth', JSON.stringify(localStorageValue));
    cy.log(`local storage token set ${localStorageValue.idToken.bearer}`);
  });
});

Cypress.Commands.add('redirectFromSuccessfulLogin', path => {
  const validJWT = JWT();
  const signedJWT = jwt.sign(JSON.stringify(validJWT), SUPER_SECRET);
  const hash = `#session_state=foo&id_token=${signedJWT}`;
  cy.visit(`${path}${hash}`);
});

Cypress.Commands.add('redirectFromSuccessfulLogout', path => {
  cy.visit(`${path}?intention=LOGOUT`);
});
