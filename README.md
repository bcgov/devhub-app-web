# Devhub App Web
> this application was scaffolded using [GatsbyJS](https://github.com/gatsbyjs/gatsby). 

Developers.gov.bc.ca is an outline platform that...

## Technology Stack Used
- GatsbyJS
- ReactJS
- GraphQL
## Third-Party Products/Libraries used and the the License they are covert by
- GatsbyJS 

**The MIT License (MIT)**

Copyright (c) 2015 Gatsbyjs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## Project Status
In Development
## Documentation
- [Internal Docs](./docs/README.md)
- [Authoring Plugins for Remark](https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
## Security

Authentication, Authorization, Policies, etc

## Files in this repository
> cmd to update tree (from project root) `tree -I 'node_modules|coverage|.cache|app-web/public' -d -L 3`
```
├── app-web
│   ├── __fixtures__
│   ├── __mocks__
│   │   └── @bcgov
│   ├── __tests__
│   │   ├── components
│   │   ├── gatsby-plugins
│   │   ├── pages
│   │   └── utils
│   ├── config
│   │   └── jest
│   ├── gatsby
│   ├── plugins
│   │   ├── gatsby-remark-path-transform
│   │   └── gatsby-source-github-all
│   ├── public
│   │   └── static
│   ├── shell-scripts
│   ├── source-registry
│   └── src
│       ├── assets
│       ├── components
│       ├── constants
│       ├── hoc
│       ├── pages
│       ├── store
│       ├── templates
│       └── utils
├── docs
│   ├── gatsby-custom-plugins
│   └── images
├── functional-tests
│   ├── gradle
│   │   └── wrapper
│   └── src
│       └── test
├── openshift
└── pipeline
    ├── gradle
    │   └── wrapper
    └── src
        └── groovy
```

## Deployment (Local Development For App-Web)

* Requires Node 8 or higher
* Clone this repo
* Change into app-web project directory
* run: `npm install`
* cp .env.production.example .env.production
* replace relevant environment variables (for local dev only)
* *it may be* beneficial to have the gatsby cli package `npm install -g gatsby-cli`
* to start development server run: `npm run dev`
* to build a production version run: `npm run build`
* to view production build run (requires gatsby-cli to be installed globally): `gatsby serve`
* to run prettier: `npm run prettify`
* to run test suites: `npm test`

## Deployment (OpenShift)

See (openshift/Readme.md)

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
