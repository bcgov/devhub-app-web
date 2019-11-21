import { getFilesFromRegistry, expandRegistry } from '../../gatsby/utils/githubRaw';
import { registry } from '../../plugins/gatsby-source-github-all/__tests__/registryHelpers';

const SOURCE_1 = {
  sourceType: 'github',
  sourceProperties: {
    owner: 'BCDevOps',
    repo: 'openshift-wiki',
    file: 'docs/RH-SSO/RequestSSORealm.md',
  },
};

const SOURCE_2 = {
  sourceType: 'github',
  sourceProperties: {
    owner: 'BCDevOps',
    repo: 'openshift-wiki',
    file: 'docs/RH-SSO/ServiceDefinition.md',
  },
};

const SOURCE_3 = {
  sourceType: 'github',
  sourceProperties: {
    owner: 'BCDevOps',
    repo: 'openshift-wiki',
    file: 'docs/API/KongAPI.md',
  },
};

const expandedRegistry = [
  {
    name: 'Authentication and Authorization',
    description:
      'Technical resources related to implementing authentication and authorization in government applications.',
    resourceType: 'Documentation',
    attributes: {
      personas: ['Developer'],
    },
    template: 'overview',
    sourceProperties: {
      sources: [SOURCE_1, SOURCE_2],
    },
  },
  {
    name: 'Developer Tools',
    description:
      'Tools to assist software developers in building, deploying, and running applications for BC Gov.',
    resourceType: 'Self-Service Tools',
    attributes: {
      personas: ['Developer'],
    },
    sourceProperties: {
      sources: [SOURCE_3],
    },
  },
];

describe('expandRegistry', () => {
  it('expands any github files into individual sources', () => {
    expect(expandRegistry(registry)).toEqual(expandedRegistry);
  });
});

describe('getFilesFromRegistry', () => {
  const registry = [
    {
      internal: {
        type: 'JourneyRegistryJson',
      },
      name: 'Journey Item 1',
      sourceProperties: {
        stops: [
          {
            stops: [
              {
                sourceType: 'github',
                sourceProperties: {
                  url: 'https://github.com/bcgov/Agile-Delivery-Process',
                  owner: 'bcgov',
                  repo: 'Agile-Delivery-Process',
                  files: ['README.md'],
                },
              },
            ],
            sourceType: 'github',
            sourceProperties: {
              url: 'https://github.com/bcgov/Agile-Delivery-Process',
              owner: 'bcgov',
              repo: 'Agile-Delivery-Process',
              file: 'foo.md',
            },
          },
        ],
      },
    },
    {
      internal: {
        type: 'TopicRegistryJson',
      },
      name: 'Registry Item 1',
      resourceType: 'Documentation',
      attributes: {
        personas: ['Developer'],
      },
      description: 'An agile process for teams to deliver digital services',
      sourceProperties: {
        sources: [
          {
            sourceType: 'github',
            sourceProperties: {
              url: 'https://github.com/bcgov/Agile-Delivery-Process',
              owner: 'bcgov',
              repo: 'Agile-Delivery-Process',
              files: ['README.md', 'foo.md'],
            },
          },
        ],
      },
    },
    {
      internal: {
        type: 'TopicRegistryJson',
      },
      name: 'Registry Item 2',
      resourceType: 'Components',
      attributes: {
        personas: ['Designer'],
      },
      description: 'An agile process for teams to deliver digital services',
      sourceProperties: {
        sources: [
          {
            sourceType: 'github',
            sourceProperties: {
              url: 'https://github.com/bcgov/Agile-Delivery-Process',
              owner: 'bar',
              repo: 'foo',
              branch: 'baz',
              file: 'README.md',
            },
          },
          {
            sourceType: 'web',
            sourceProperties: {
              url: 'https://google./com',
            },
          },
          {
            sourceType: 'github',
            sourceProperties: {
              url: 'https://github.com/bcgov/Agile-Delivery-Process',
              owner: 'bcgov',
              repo: 'Agile-Delivery-Process',
              files: ['README.md'],
            },
          },
        ],
      },
    },
    {
      internal: {
        type: 'TopicRegistryJson',
      },
      name: 'Registry Item 3',
      resourceType: 'Documentation',
      attributes: {},
      description: 'An agile process for teams to deliver digital services',
      sourceProperties: {
        sources: [
          {
            sourceType: 'github',
            sourceProperties: {
              url: 'https://github.com/bcgov/Agile-Delivery-Process',
              owner: 'bcgov',
              repo: 'Agile-Delivery-Process',
              files: ['MattDamon.md'],
            },
          },
        ],
      },
    },
  ];

  it('returns a list of files', () => {
    const getNode = jest.fn();
    getNode.mockReturnValue(registry);
    const expected = [
      {
        url: 'https://github.com/bcgov/Agile-Delivery-Process/blob/master/README.md',
        topics: ['Registry Item 1', 'Registry Item 2'],
        journeys: ['Journey Item 1'],
        topicPersonas: ['Developer'],
        topicResourceType: 'Documentation',
        position: 0,
      },
      {
        url: 'https://github.com/bcgov/Agile-Delivery-Process/blob/master/foo.md',
        topics: ['Registry Item 1'],
        journeys: ['Journey Item 1'],
        topicPersonas: ['Developer'],
        topicResourceType: 'Documentation',
        position: 1,
      },
      {
        url: 'https://github.com/bar/foo/blob/baz/README.md',
        topics: ['Registry Item 2'],
        journeys: [],
        topicPersonas: ['Designer'],
        topicResourceType: 'Components',
        position: 2,
      },
      {
        url: 'https://github.com/bcgov/Agile-Delivery-Process/blob/master/MattDamon.md',
        topics: ['Registry Item 3'],
        journeys: [],
        topicPersonas: [],
        topicResourceType: 'Documentation',
        position: 5,
      },
    ];
    expect(getFilesFromRegistry(getNode)).toEqual(expected);
  });
});
