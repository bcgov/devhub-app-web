import { getFilesFromRegistry } from '../../../gatsby/utils/githubRaw';

describe('getFilesFromRegistry', () => {
  const registry = [
    {
      internal: {
        type: 'RegistryJson',
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
        type: 'RegistryJson',
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
  ];

  it('returns a list of files', () => {
    const getNode = jest.fn();
    getNode.mockReturnValue(registry);
    const expected = [
      {
        url: 'https://github.com/bcgov/Agile-Delivery-Process/blob/master/README.md',
        topics: ['Registry Item 1', 'Registry Item 2'],
        topicPersonas: ['Developer'],
        topicResourceType: 'Documentation',
      },
      {
        url: 'https://github.com/bcgov/Agile-Delivery-Process/blob/master/foo.md',
        topics: ['Registry Item 1'],
        topicPersonas: ['Developer'],
        topicResourceType: 'Documentation',
      },
      {
        url: 'https://github.com/bar/foo/blob/baz/README.md',
        topics: ['Registry Item 2'],
        topicPersonas: ['Designer'],
        topicResourceType: 'Components',
      },
    ];
    expect(getFilesFromRegistry(getNode)).toEqual(expected);
  });
});
