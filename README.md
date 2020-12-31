
# Devhub
 
 This is the primary repository for the BC Gov DevHub application. This is a mono repo holding multiple services that are coupled together. More details can be found in the [schematic](./schematic.md)
 

## Deploying Devhub

The Devhub has a ton of components that are stiched together that need to be deployed in a specific order. The best way to accomplish is is to first deploy the CI/CD pipelines (deploy-tron and jenkins) to perform the work for you. 

### Pre Requisites
- Obtain a Openshift Project Set (dev, test, tools, prod)
- Apply for a realm in the 3 SSO instances (dev, test, prod)
- Create a Service Account in the Dev SSO instance to perform the automated client creation in the CI/CD workflow
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
    -p DEV_NAMESPACE= \
   oc apply -f -
```