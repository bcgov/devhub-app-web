
# Devhub
 
 This is the primary repository for the BC Gov DevHub application. This is a mono repo holding multiple services that are coupled together. More details can be found in the [schematic](./schematic.md)
 

## Deploying Devhub

The Devhub has a ton of components that are stiched together that need to be deployed in a specific order. The best way to accomplish is is to first deploy the CI/CD pipelines (deploy-tron and jenkins) to perform the work for you. 

### Pre Requisites
- Obtain a Openshift Project Set (dev, test, tools, prod)
- Apply for a realm in the 3 SSO instances (dev, test, prod)
- Create a Service Account in the Dev SSO instance to perform the automated client creation in the CI/CD workflow. Ensure you have enough priviledges to `manage clients` with this service account!
  - when you have the service account user those credentials to create a secret in the `tools` namespace. `oc process -f openshift/supporting-infrastructure/keycloak.secret.yaml -p KEYCLOAK_CLIENT_ID=... -p KEYCLOAK_CLIENT_SECRET=... | oc apply -f -` This is for long term storage.
- Setup an [Algolia Production Account](https://algolia.com) (this costs moolah) and collect your application id, search key and admin api key. 
  ```
    oc process -f openshift/templates/web/algolia-build.secret.yaml \ 
    -p ALGOLIA_ADMIN_KEY= \
    -p GATSBY_ALGOLIA_APP_ID= \
    -p GATSBY_ALGOLIA_SEARCH_KEY= |
     oc apply -f -
  ```
- Create the CI/CD service account that the Github Actions will utilize
```
   oc process -f openshift/templates/supporting-infrastructure/cicd.yaml \
    -p TOOLS_NAMESPACE= \
    -p PROD_NAMESPACE= \
    -p TEST_NAMESPACE= \ 
    -p DEV_NAMESPACE= |
   oc apply -f -
```
  - Obtain the SA Name and Credentials

- Setup your GITHUB secrets so that the CI/CD workflows work correctly. These are the following secrets you will need to add.
```
ALGOLIA_API_KEY
ALGOLIA_APP_ID
ALGOLIA_SEARCH_KEY
DEV_NAMESPACE
TEST_NAMESPACE
TOOLS_NAMESPACE
PROD_NAMESPACE
# event brite key is optional
EVENT_BRITE_API_KEY 
# your key cloack service accout client id
KC_SA_CLIENT_ID
KC_SA_CLIENT_SECRET
OPENSHIFT_SERVER_URL
OPENSHIFT_SA_NAME
# this is the openshift service account secret token
OPENSHIFT_SA_PASSWORD
# optional as described in schematic.md recommended not to use searchgate
SEARCHGATE_API_URL
```

- Deploy [deploy-tron](https://github.com/patricksimonian/deploy-tron#building-and-deploying-on-openshift) and setup a Github App for your repository.

> deploy tron will be your interface for CD with the devhub front end component

- In order to deploy the Devhub Front End Component you will need to create the s2i builder image in your tools namespace. You can do that easily by
```
  oc process -f https://raw.githubusercontent.com/bcgov/s2i-caddy-nodejs/master/openshift/templates/build.yaml | 
  oc apply -f -
```



## Deploying Devhub

It's as easy as creating a PR and running them command in your PR `@deploy-tron deploy web to dev`!