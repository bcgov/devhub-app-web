## Setting Up Key Cloak

The Devhub requires a realm created for each instance of key cloak (dev, test, prod)

there urls are 
- https://sso-dev.pathfinder.gov.bc.ca
- https://sso-test.pathfinder.gov.bc.ca
- https://sso.pathfinder.gov.bc.ca

Please make a realm request to have a realm created for each of these instances.

## Special Considerations for Dev

In dev, the pipeline should dynamically create a new keycloak realm via the Jenkinsfile. This requires
that creation of a service account that has the correct permissions to manage clients in the dev instance of keycloak. 

### Creating a Service Account

1. Navigate to the dev sso realm and click on the clients tab
2. click create
3. assign a client id (something like devhub-service-account)
4. Once created navigate to that client and change `Access Type` to `confidential`
5. Enable Service Accounts
6. Modify Service Account roles to allow management of clients. 
  a. add client role `realm management`
  b. add roles `view clients`, `manage clients`, `create clients`
7. Navigate to the `Credentials` Tab in take note of the secret.
8. Create a secret (in the Dev namespace) from the template `keycloak.secret.yaml` using the client id and secret


The `kc-create-client` script leverages this secret in the devhub namespace to get an access token to
create clients dynamically

