# Authentication

The Devhub utilizes the OIDC `Implicit Authorization` flow. This flow is best used for short sessions where a user may
only need a few minutes to access a site while authenticated.

For more information on implicit authorization flow please see https://medium.com/@nilasini/real-world-example-to-understand-oidc-implicit-flow-ecdf1b1d0156

## Definition of a Logged in User
The definition of a logged in user is a __valid javascript object containing a valid JWT token that HAS NOT EXPIRED__.
This definition is provided to the rest of the application via `AuthContext`

## How it works

The Devhub leverages an in-house built package called `@bcgov/common-web-utils`. Inside that package there is
an object called `ImplicitAuthManager`. 

The ImplicitAuthManager contains several utilities including a complex routine to handle redirecting users
to sso for logging on on page load. 

## Key Components

All authorization related routines are handled inside of __React Hooks__ found within the `hooks.js` file. 

Namely, the `useImplicitAuthManager` and `useAuthenticated` hooks. 

### useImplicitAuthManager

This hook is leveraged by the `AuthContext` component. This component provides __user context__ to the application. 

The hook triggers the page redirect routine to implicitly log a user in as well as registers callbacks to 'login/logout' a user when valid redirect information is passed back from the sso provider. 

## useAuthenticated

This hooks returns an object that contains a boolean whether a user  is authenticated or not. It can
easily by accessed by the line `const {authenticated} = useAuthenticated()` within a __React Component__.


