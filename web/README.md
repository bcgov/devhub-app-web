## DevHub

DevHub aims to become the "Central Nervous System" for the growing gov developer community.  We also describe it like a "wayfinding" tool for digital product teams. 

It will provide a comprehensive inventory of relevant internal and external documentation, open source components, services, APIs and data for internal and external developers who are building government products, or want to build their own products

It will also be a platform through which government teams can share their developer resources for discovery and use by internal and external developers.

It will provide an inventory of ongoing open product development products, components and teams

The resources will be collected into curated various focused kits/topics of resources needed to build particular types of systems, assist teams at a point in their lifecycle, support persona specific-workflows, etc. 

It will also provide a aeans to seed “prosumer”/community behaviours. For example, it will be possible to view source/fork/comment/PR on many of the elements in the DevHub.

## Technical Details

This application is a static site and is generated using [GatsbyJS](https://github.com/gatsbyjs/gatsby).

Here are some of the other components/technologies used by DevHub: 

- ReactJS
- GraphQL
- StorybookJS

## Third-Party Products/Libraries
- Algolia (for searching) 
- GatsbyJS  


## Project Status
In Development

## Documentation
- [Internal Docs](docs/README.md)
- [Authoring Plugins for Remark](https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
- [Testing and QA](docs/testingAndQa.md)
- [Search](docs/searchWithAlgolia.md)


## Getting Started
* Setup a Developer Account with [Algolia](https://algolia.com). Use the __Community__ version.


## Deployment (Local Development For App-Web)

* Requires **Node 10** and **npm 6**
* Clone this repo
* Change into web project directory `cp web`
* run: `npm install`
* copy and update your env file
* `cp .env.production.example .env.production`
* to start development server run: `npm run dev`
* to build a production version run: `npm run build`
* to view production build run: `npx gatsby serve`
* to run prettier: `npm run prettify`
* to run test suites: `npm test`
* to run storybook: `npm run storybook`

## Deployment (Docker Compose for Local Development)

* Requires **Docker**  & **Docker Compose** (and for Windows users. some `bash` compatible environment)
* clone the repo to your workstation
* from the root of your local repo, run `./preview.sh`

An pre-built "previewer" image will be pulled down from Docker Hub to your local workstation and fired up.  It will likely take a few minutes the first time you do this.  Once the image has been pulled down, DevHub will kick in and process the content defined in the `registry` directory.  After a few minutes, you'll be able to peek at the DevHub running locally at [http://localhost:8000](http://localhost:8000).

At this point, you can modify contents of the `registry` directory (adding resources or topics for example), or rebuild and preview locally based on changes in repositories that area already referenced in the `registry`.  If you make changes to the `registry` or remote content, you willneed to restart the previewer via ^C and running `./preview.sh` again - the hot reload does not apply to `registry` or remote content.

## Openshift

1. Deploy the Jenkins Instance. 
   > info the jenkins job is found at `docker/contrib.../jobs/_jenkins`
   a. change into the jenkins node js builder/deployer tool `cd .jenkins/.pipeline/lib`
   b. explore the `config.js` file this contains some important params that will be passed into the build templates which are located at `openshift/build-master.yaml`, `openshift/build-slave.yaml`
   c. for some reason I (Patrick) have not be able to use the `--dev-mode` flag of this version of the jenkins bcdk
   and so you will need to make a live pr to your repository before continuing
   d. log into oc through the command line and switch projects to your tools name space
   e. build the live pr, from the `lib` directory, run `npm run build --  --pr=<your pr number>`
   f. observe that the build was succesful by either viewing logs through the oc cli or the openshift console
   h. when the build is complete you may deploy straight to production (since this is the initial deployment)
   g. run `npm run deploy -- --pr=<you pr number> --env=prod`
   i. observe that your build is complete

> please note jobs are built into the image, if you change any jobs  (`docker/contrib.../jobs`), you will need to
rebuild the image

2. Deploy the application
> Jenkins should now be looking for prs
   a. make a pr for your code changes and jenkins should fire off a job to build and deploy the application
   b. if builds do not fire off, you may build and deploy the application seperately. Process and apply all templates
   withing the `openshift/templates` directory

## Development Guide/Considerations

   Devhub leverages different sources of content via the `gatsby-source-plugin`. These sources are
   connected in a variety of ways to produce meaningful connections to build things like topics, and navigational
   elements. Because different source plugins produce different schemas, a __minimum schema__ is extended from each
   node type that is to be leveraged as a 'card' in the devhub. More information can be found on this [here](./docs/devhubCardSpec.md)

### Authentication
   Devhub utilizes __Authorization Code Flow__. This is provided automatically by the app via `Keycloak Javascript Adapter` and the hook 
   `useKeycloak`.
   ```js
      import React from 'react'
      import { useKeycloak } from '@react-keycloak/web';

      const MyComponent = () => {
         const [keycloak] = useKeycloak();
         // need to ensure keycloak obj has been initialized before checking properties
         const authenticated = keycloak && keycloak.authenticated;
         if(auth) {
            // do something here
         } else {
            // foo
         }
      }
   ```
## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](https://github.com/bcgov/devhub-app-web/issues/).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## Issues/Suggestions
Make Suggestions/Issues [here!](https://github.com/bcgov/devhub-app-web/issues/new)
Issues are [markdown supported](https://guides.github.com/features/mastering-markdown/).

## License

    Copyright 2018 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
