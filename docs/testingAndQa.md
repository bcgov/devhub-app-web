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
`@testing-library/react` is our choice for doing component testing.

> `@testing-library/react` was moved to `@testing-library/react` in future versions

