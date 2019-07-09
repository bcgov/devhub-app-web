import {
  extractSourcesFromRegistry,
  expandRegistry,
  applyInferredIdToSources,
} from '../utils/registryHelpers';
import { flattenGithubFilesToRegistryItems } from '../utils/sources/github';
jest.mock('../utils/inferIdByType.js', () => ({
  inferIdByType: jest.fn(() => 'id'),
}));

jest.mock('../utils/sources/github/');

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

const registry = [
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
      sources: [
        {
          sourceType: 'github',
          sourceProperties: {
            owner: 'BCDevOps',
            repo: 'openshift-wiki',
            files: ['docs/RH-SSO/RequestSSORealm.md', 'docs/RH-SSO/ServiceDefinition.md'],
          },
        },
      ],
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
      sources: [
        {
          sourceType: 'github',
          sourceProperties: {
            owner: 'BCDevOps',
            repo: 'openshift-wiki',
            files: ['docs/API/KongAPI.md'],
          },
        },
      ],
    },
  },
];

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
    flattenGithubFilesToRegistryItems
      .mockReturnValueOnce([SOURCE_1, SOURCE_2])
      .mockReturnValueOnce([SOURCE_3]);

    expect(expandRegistry(registry)).toEqual(expandedRegistry);
  });
});

describe('extractSourcesFromRegistry', () => {
  it('it returns all sources from the registry', () => {
    // you will notice the url property is missing in source type github
    // url is not used and is be deprecated from future functions
    const sources = [SOURCE_1, SOURCE_2, SOURCE_3];

    expect(extractSourcesFromRegistry(expandedRegistry)).toEqual(sources);
  });
});

describe('applyInferredIdToSources', () => {
  it('applies id to expanded sources', () => {
    const registryWithIds = applyInferredIdToSources(expandedRegistry);

    expect(registryWithIds[0].sources[0].id).toBe('id');
    expect(registryWithIds[1].sources[0].id).toBe('id');
  });
});
