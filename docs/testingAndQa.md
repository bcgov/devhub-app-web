# Testing and QA

## End to End Testing With Cypress
End to End tests are similar to functional testing in that they test the application from the users perspective. 

More information on cypress can be found [here](https://docs.cypress.io/guides/overview/why-cypress.html).

To run the cypress test runner, get your local dev server running and then in a new terminal run `npm run cy:dev`
> more cypress related npm scripts can be found within `app-web/package.json`

### Developing E2E Tests
Ideally you should aim to write E2E tests while developing features/fixing bugs :)

### Integration with Github Actions
Cypress has a docker image and a CI mode which is leveraged within Github Actions

## Unit/Integration Tests
As of March 2019 we are transitioning out of enzyme based unit tests as our component testing library to instead
`react-testing-library` which is more lightweight solution. 

> `react-testing-library` was moved to `@testing-library/react` in future versions

### The Motivation

React has recently added some great new features, namely the __Hooks API__ and __Memoization__

Enzyme does not currently support these features and fails :( React testing library works out of the
box with these features.
> hurrah for no more finding npm plugins to patch a leaky testing library

### Ongoing development

There are MANY tests utilizing enzyme and obviously we cannot take on the task of re writing these
into react-testing-library all at once. For the time being only NEW tests will be based of this new framework. 

