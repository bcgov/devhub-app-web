import {
  reduceFormSourceToSourceProperties,
  convertToRegistryFormat,
} from '../../src/utils/contentContribution';

describe('Topic Form Helpers', () => {
  const githubSource = {
    sourceType: 'github',
    sourceProperties: {
      url: 'https://github.com/bcgov/devhub-app-web',
      repo: 'devhub-app-web',
      owner: 'bcgov',
      files: 'foo.md,   bar.md, baz.md  ',
    },
    resourceType: 'Documentation',
  };

  const expectedGithubSource = {
    sourceType: 'github',
    sourceProperties: {
      url: 'https://github.com/bcgov/devhub-app-web',
      repo: 'devhub-app-web',
      owner: 'bcgov',
      files: ['foo.md', 'bar.md', 'baz.md'],
    },
    resourceType: 'Documentation',
  };

  const webSource = {
    sourceType: 'web',
    sourceProperties: {
      url: 'https://github.com/bcgov/devhub-app-web',
      title: 'devhub-app-web',
      description: 'bcgov',
    },
    resourceType: 'Documentation',
  };

  test('it converts to registry format', () => {
    const topicFormData = {
      topicName: 'Foo',
      topicDescription: 'Bar',
      sources: [githubSource, webSource],
    };

    const expected = {
      name: 'Foo',
      description: 'Bar',
      sourceProperties: {
        sources: [expectedGithubSource, webSource],
      },
    };

    expect(convertToRegistryFormat(topicFormData)).toEqual(expected);
  });

  test('it can properly reduce a github source to source properties', () => {
    const expected = {
      url: 'https://github.com/bcgov/devhub-app-web',
      repo: 'devhub-app-web',
      owner: 'bcgov',
      files: ['foo.md', 'bar.md', 'baz.md'],
    };

    expect(reduceFormSourceToSourceProperties(githubSource)).toEqual(expected);
  });

  test('it returns {} if invalid source type is passed', () => {
    expect(reduceFormSourceToSourceProperties({ sourceType: 'foo' })).toEqual({});
  });

  // The test does not check for the image attributes, for web sources. This is because, we are not using
  // image inputs for v1 of the content contribution feature.
  test('it can properly reduce a web source to source properties', () => {
    const expected = {
      url: 'https://github.com/bcgov/devhub-app-web',
      title: 'devhub-app-web',
      description: 'bcgov',
    };

    expect(reduceFormSourceToSourceProperties(webSource)).toEqual(expected);
  });
});
