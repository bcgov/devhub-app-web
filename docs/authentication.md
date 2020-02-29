# Authentication

The Devhub utilizes the OIDC `Authorization Code` flow. 


## Definition of a Logged in User
The definition of a logged in user is a provided by the `keycloak.authenticated` property.
This definition is provided to the rest of the application via the hook `useKeycloak`

