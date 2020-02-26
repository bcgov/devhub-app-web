const process = require('process');
const { reduceContentsResults } = require('../utils');
const { hasNoErrors } = require('../validators');
const core = require('@actions/core');
const run = require('../run.js');
core.getInput = jest.fn();

require('babel-polyfill');
const nock = require('nock');
nock.disableNetConnect();

const TOPICS_FIXTURE = {
  repository: {
    id: 'MDEwOlJlcG9zaXRvcnkxNDg2Nzk1OTQ=',
    name: 'devhub-app-web',
    object: {
      entries: [
        {
          name: 'topic1.json',
          object: {
            text:
              '{\n  "name": "Agile Delivery Process",\n  "description": "An agile process for teams to deliver digital services",\n  "sourceProperties": {\n    "sources": [\n      {\n        "sourceType": "github",\n        "sourceProperties": {\n          "url": "https://github.com/bcgov/Agile-Delivery-Process",\n          "owner": "bcgov",\n          "repo": "Agile-Delivery-Process",\n          "files": [\n            "README.md",\n            "01_Alignment.md",\n            "02_Discovery.md",\n            "03_Alpha.md",\n            "04_Beta.md",\n            "05_Live.md"\n          ]\n        }\n      }\n    ]\n  },\n  "attributes": {\n    "labels": [\n      "Documentation",\n      "Repository"\n    ],\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
          },
        },
        {
          name: 'topic2.json',
          object: {
            text:
              '{\n  "name": "Agile Delivery Process",\n  "description": "An agile process for teams to deliver digital services",\n  "sourceProperties": {\n    "sources": [\n      {\n        "sourceType": "github",\n        "sourceProperties": {\n          "url": "https://github.com/bcgov/Agile-Delivery-Process",\n          "owner": "bcgov",\n          "repo": "Agile-Delivery-Process",\n          "files": [\n            "README.md",\n            "01_Alignment.md",\n            "02_Discovery.md",\n            "03_Alpha.md",\n            "04_Beta.md",\n            "05_Live.md"\n          ]\n        }\n      }\n    ]\n  },\n  "attributes": {\n    "labels": [\n      "Documentation",\n      "Repository"\n    ],\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
          },
        },
      ],
    },
  },
};
const JOURNEYS_FIXTURE = {
  repository: {
    id: 'MDEwOlJlcG9zaXRvcnkxNDg2Nzk1OTQ=',
    name: 'devhub-app-web',
    object: {
      entries: [
        {
          name: 'journey1.json',
          object: {
            text:
              '{\n  "name": "Beginner Guide to Developing on the Platform",\n  "description": "An overview on Openshift, Development Best Practices, and Troubleshooting",\n  "sourceProperties": {\n    "stops": [\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n "branch": "foo", \n           "file": "resources/community/new-developer.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/what-is-openshift.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/openshift101.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/openshift201.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/rocketchat.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "README.md",\n            "url": "https://github.com/bcgov/BC-Policy-Framework-For-GitHub", \n            "owner": "bcgov", \n            "repo": "BC-Policy-Framework-For-GitHub"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/best-practices-for-app-development.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/finding-resources.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/npm-publishing.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/security/security-for-beginners.md", \n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n          }\n      }\n    ]\n  },\n  "attributes": {\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
          },
        },
        {
          name: 'journey2.json',
          object: {
            text:
              '{\n  "name": "Beginner Guide to Developing on the Platform",\n  "description": "An overview on Openshift, Development Best Practices, and Troubleshooting",\n  "sourceProperties": {\n    "stops": [\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/new-developer.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/what-is-openshift.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/openshift101.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/openshift201.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/rocketchat.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "README.md",\n            "url": "https://github.com/bcgov/BC-Policy-Framework-For-GitHub", \n            "owner": "bcgov", \n            "repo": "BC-Policy-Framework-For-GitHub"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/best-practices-for-app-development.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/finding-resources.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/community/npm-publishing.md",\n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n           }\n      },\n      { \n        "sourceType": "github",\n        "sourceProperties":\n          { \n            "file": "resources/security/security-for-beginners.md", \n            "url": "https://github.com/bcgov/devhub-resources", \n            "owner": "bcgov", \n            "repo": "devhub-resources"\n          }\n      }\n    ]\n  },\n  "attributes": {\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
          },
        },
      ],
    },
  },
};

const CONTENTS_FIXTURE = {
  repository: {
    object: {
      id: 'MDQ6QmxvYjE0ODY3OTU5NDoyZTk1ZWVjODg3YTQ2ODc5ZjI5MzE3NDdjZjEzNjNiOWRkNzQ5Yjk2',
      text:
        '---\ndescription: This is the primary repository for the BC Gov DevHub application\nauthor: sheaphillips\nimage: https://github.com/bcgov/devhub-app-web/blob/master/docs/images/book.png?raw=true\n---\n\n> looking for pipeline docs? Please see [Jenkins Readme](./.jenkins/README.md) :)\n\n# DevHub App Web\n \n This is the primary repository for the BC Gov DevHub application.  The code contained mostly relates to the web application specifically, but other content may relate to the DevHub more generally.     \n \n## DevHub Intro\n\nDevHub aims to become the "Central Nervous System" for the growing gov developer community.  We also describe it    like a "wayfinding" tool for digital product teams. \n\nIt will provide a comprehensive inventory of relevant internal and external documentation, open source components, services, APIs and data for internal and external developers who are building government products, or want to build their own products\n\nIt will also be a platform through which government teams can share their developer resources for discovery and use by internal and external developers.\n\nIt will provide an inventory of ongoing open product development products, components and teams\n\nThe resources will be collected into curated various focused kits/topics of resources needed to build particular types of systems, assist teams at a point in their lifecycle, support persona specific-workflows, etc. \n\nIt will also provide a aeans to seed “prosumer”/community behaviours. For example, it will be possible to view source/fork/comment/PR on many of the elements in the DevHub.\n\n## How Resources Are Sourced and Connected Together (from the developer\'s prespective)\n\nResources are sourced via a set of __Gatsby Source Plugins__. These plugins are installed through npm (or sourced locally) and then declared within `gatsby-config.js`. \n\nTo link nodes together there are a couple of different constructs that are being utilized. \n\n### Registry JSON Files\n\nThe registry is the current way files are sourced from github, they are collection by the `gatsby-source-github-all` plugin (soon to be replaced with `gatsby-source-github-raw`) and go through some processes to link resources into relatable topics. \n\n### Extending Nodes With Fields and Mapping Them Together\n> mapping nodes https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types\n\nGatsby has several provisions for automatically linking unlike nodes together based on some conventions. \nThe one that we are currently trying out is _mapping_ nodes together. \n\nWithin `gatsby/createNode.js` are a set of functions that extend different _source plugins_ to draw out\nsome normalized abstractions. For example, we have markdown files representing _Topics_ (found within `/topics`)\nand the set of registry files declaring what resources belong inside of a topic. The `gatsby-source-github-all` creates nodes of type `DevhubTopic` (the former name for a Topic): a __slug__ and __content__ property\nare extended from this node using `createNodeField`. Subsequently, the `id` frontmatter property of each topic markdown node (`/topics/agile-development.md` for example) is extended. The `id` field from the markdown node is mapped to the DevhubTopic `content` field and is thus ___linked___ together:)\n\nAn amazingly detailed and professional schematic can be found [here](./docs/images/connecting-nodes.jpg)\n\n\n## Resource Types\n ',
    },
  },
};

test('Reducing Github GraphQL Contents', () => {
  const expected = [
    {
      path: 'app-web/topic1.json',
      contents:
        '{\n  "name": "Agile Delivery Process",\n  "description": "An agile process for teams to deliver digital services",\n  "sourceProperties": {\n    "sources": [\n      {\n        "sourceType": "github",\n        "sourceProperties": {\n          "url": "https://github.com/bcgov/Agile-Delivery-Process",\n          "owner": "bcgov",\n          "repo": "Agile-Delivery-Process",\n          "files": [\n            "README.md",\n            "01_Alignment.md",\n            "02_Discovery.md",\n            "03_Alpha.md",\n            "04_Beta.md",\n            "05_Live.md"\n          ]\n        }\n      }\n    ]\n  },\n  "attributes": {\n    "labels": [\n      "Documentation",\n      "Repository"\n    ],\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
    },
    {
      path: 'app-web/topic2.json',
      contents:
        '{\n  "name": "Agile Delivery Process",\n  "description": "An agile process for teams to deliver digital services",\n  "sourceProperties": {\n    "sources": [\n      {\n        "sourceType": "github",\n        "sourceProperties": {\n          "url": "https://github.com/bcgov/Agile-Delivery-Process",\n          "owner": "bcgov",\n          "repo": "Agile-Delivery-Process",\n          "files": [\n            "README.md",\n            "01_Alignment.md",\n            "02_Discovery.md",\n            "03_Alpha.md",\n            "04_Beta.md",\n            "05_Live.md"\n          ]\n        }\n      }\n    ]\n  },\n  "attributes": {\n    "labels": [\n      "Documentation",\n      "Repository"\n    ],\n    "personas": [\n      "Designer",\n      "Developer",\n      "Product Owner"\n    ]\n  },\n  "resourceType": "Documentation"\n}\n',
    },
  ];

  expect(reduceContentsResults('app-web', TOPICS_FIXTURE)).toEqual(expected);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('it can fetch and process', async () => {
  core.getInput.mockReturnValue('repo');
  core.getInput.mockReturnValue('owner');
  // setting up github server mock
  nock('https://api.github.com')
    .post('/graphql')
    .once()
    .reply(200, { data: TOPICS_FIXTURE });

  nock('https://api.github.com')
    .post('/graphql')
    .once()
    .reply(200, { data: JOURNEYS_FIXTURE });

  nock('https://api.github.com')
    .post('/graphql')
    .times(1000)
    .reply(200, { data: CONTENTS_FIXTURE });

  process.env['GITHUB_TOKEN'] = 500;

  await run();
}, 20000);

describe('validation', () => {
  test('hasNoErrors', () => {
    const messages1 = [{ type: 'error' }, { type: 'warn' }, null];

    const messages2 = [{ type: 'warn' }, { type: 'warn' }, null];

    const messages3 = [null, null, null];
    expect(hasNoErrors(messages1)).toBe(false);
    expect(hasNoErrors(messages2)).toBe(true);
    expect(hasNoErrors(messages3)).toBe(true);
  });
});
