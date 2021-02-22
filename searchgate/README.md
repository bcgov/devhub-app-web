# Search Gate
A graphql search federation api

## Technology Stack Used

- Apollo

## Project Status
Active

## Structure
```
.
├── config
├── constants
├── datasources
├── docs
└── openshift
```
## Interacting with the API

To test this api locally it is beneficial to have a graphql playground which visualizes queries (much better than running inline curl commands. [Graphql Playground](https://github.com/prisma-labs/graphql-playground)


## Run Locally
1. git clone project
2. cd into working directory and run `npm install`
3. copy env vars `cp .env.example .env` and fill in with appropriate credentials
4. npm install


## Deployment (OpenShift)

This application was built using the [bcdk](https://github.com/bcdevop/bcdk) and the [pipeline cli](https://github.com/bcdevops/pipeline-cli).

Prior to running any builds or deploys, ensure you have generated a github auth secret for each respective namepspace you are deploying search gate too. `oc process -f openshift/templates/searchgate/secret-template.yaml -p GITHUB_TOKEN=<token> | oc apply -f - -n <namespace>`

1. Build the search gate service by processing and applying the `bc.yaml` file
2. Deploy the search gate service by processing and applying the `dc.yaml` file


Alternatively you can opt to use the CD pipeline configuired for this app. This involves having `deploy-tron` [setup for your repository.](https://github.com/patricksimonian/deploy-tron#building-and-deploying-on-openshift)

Every PR kicks can kick of a github workflow to deploy. When opening a PR, authorized users can trigger a workflow by creating a github deployment via deploy-tron, a continuous delivery github app. Enter a comment in the PR like `@deploy-tron deploy searchgate to dev`.

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## License

    Copyright 2019 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
