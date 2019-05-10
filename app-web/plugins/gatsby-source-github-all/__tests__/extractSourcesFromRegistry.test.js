import { extractSourcesFromRegistry } from '../utils/extractSourcesFromRegistry';
import { flattenGithubFilesToRegistryItems } from '../utils/sources/github';
jest.mock('../utils/inferIdByType.js', () => ({
  inferIdByType: jest.fn(() => 'id'),
}));

jest.mock('../utils/sources/github/');

describe('extractSourcesFromRegistry', () => {
  it('it flattens out the registry', () => {
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
                url: 'https://github.com/bcdevops/openshift-wiki',
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
                url: 'https://github.com/BCDevOps/openshift-wiki',
                owner: 'BCDevOps',
                repo: 'openshift-wiki',
                files: ['docs/API/KongAPI.md'],
              },
            },
          ],
        },
      },
    ];

    const SOURCE_1 = {
      sourceType: 'github',
      id: 'id',
      sourceProperties: {
        owner: 'BCDevOps',
        repo: 'openshift-wiki',
        file: 'docs/RH-SSO/RequestSSORealm.md',
      },
    };

    const SOURCE_2 = {
      sourceType: 'github',
      id: 'id',
      sourceProperties: {
        owner: 'BCDevOps',
        repo: 'openshift-wiki',
        file: 'docs/RH-SSO/ServiceDefinition.md',
      },
    };

    const SOURCE_3 = {
      sourceType: 'github',
      id: 'id',
      sourceProperties: {
        owner: 'BCDevOps',
        repo: 'openshift-wiki',
        file: 'docs/API/KongAPI.md',
      },
    };

    flattenGithubFilesToRegistryItems
      .mockReturnValueOnce([SOURCE_1, SOURCE_2])
      .mockReturnValueOnce([SOURCE_3]);
    // you will notice the url property is missing in source type github
    // url is not used and is be deprecated from future functions
    const sources = [SOURCE_1, SOURCE_2, SOURCE_3];

    expect(extractSourcesFromRegistry(registry)).toEqual(sources);
  });
});
