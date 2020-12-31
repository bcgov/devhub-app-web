## Here is a snapshot of the Devhub Eco System

![diagram](./diagram.jpg)


Starting from the center and working outwards here is a description of the services Devhub Utilizes.



1. Devhub App Frontend:

This is the core service for the Devhub. It is a Gatsby JS application that consumes, annotates and aggregates content primarily from Github in the from of markdown files that are then rendered as HTML. The deployment is created by using the [caddys2i builder](https://github.com/bcgov/s2i-caddy-nodejs). The Caddy Deployment relies heavily on its variable template replacing to pass appropriate runtime configurations such as SSO urls etc. 

2. Keycloak:

Keycloak is an external authentication service. It is **OPTIONAL** to connect to keycloak. The Devhub had a few services that required authentication which have since been deprecated. The setup instructions will describe how to setup your keycloak clients correctly. 

3. Algolia Search Service:

This is an [external search engine](https://algolia.com) service. The devhub will build indices with this service at build time and subsequently promote search indiceses to prod in a similar fashion as the devhub web deployment is promoted through its environments. This service is a paid service and you will need to setup an account in order to deploy the devhub.

4. Github Actions CI/CD Service:

There are several workflows performing work in the primary devhub repo. The ones of note are the `deploy-web-to-dev` and `promote-web` workflows which are an experiment of deploying the devhub frontend service to Openshift using a service account. This is closely coupled to a github app called [Deploy Tron](https://github.com/patricksimonian/deploy-tron) which is a bot that listens for commands to trigger these CD workflows. 


5. Search Gate:

This is an **OPTIONAL** service that provides search functionality to additional sources in the Devhub. It is closely coupled to Rocketgate and Docugate which are are similarly built Apollo Graphql Apis. Keycloak integration is required to utilize searchgate through the Devhub Front End UI. It is recommended to not deploy this service at is more of an experiment and not optimized for heavy production usage. 

6. Devhub API

This is an **OPTIONAL** service that initially served as an interface to creating topics and journeys through a web UI from in the frontend. It was found the feature was fundamentally not fit for production usage. This service is not recommeneded to be deployed. 

7. Docugate

This is a service that is required to be deployed and coupled to Search Gate. It is a graphql API that exposes public information from the bcgov documize instance. Again it is not recommended to deploy this as its more of an experiment!

8. Rocketgate

This is a service that is required to be deployed and coupled to Search Gate. It is a graphql API that exposes public information from the bcgov rocketchat instance. Again it is not recommended to deploy this as its more of an experiment!

9. Deploy Tron

 [Deploy Tron](https://github.com/patricksimonian/deploy-tron) is a github app that you will need to deploy in order to run any CI/CD work on the front end component. 

10. Jenkins

Jenkins is responsible for building/deploying the remaining internal services. We manage a customized instance of jenkins that can be found through the `.jenkins` folder. 