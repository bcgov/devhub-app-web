// this is a work around to allow of actual use of Link component
// https://www.gatsbyjs.org/docs/unit-testing/#testing-components-with-router
jest.unmock('gatsby');
module.exports = jest.requireActual('gatsby-link');
