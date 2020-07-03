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

  const webSource = {
    sourceType: 'web',
    sourceProperties: {
      url: 'https://github.com/bcgov/devhub-app-web',
      title: 'devhub-app-web',
      description: 'bcgov',
      image: 'foo.png',
      bar: 'baz',
    },
    resourceType: 'Documentation',
  };

  test('it converts to registry format', () => {
    const topicFormData = {
      name: 'Foo',
      description: 'Bar',
      sources: [githubSource, webSource],
    };

    const expected = {
      name: 'Foo',
      description: 'Bar',
      sourceProperties: {
        sources: [githubSource, webSource],
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

  test('it can properly reduce a web source to source properties', () => {
    const expected = {
      url: 'https://github.com/bcgov/devhub-app-web',
      title: 'devhub-app-web',
      description: 'bcgov',
      image: 'foo.png',
      bar: 'baz',
    };

    expect(reduceFormSourceToSourceProperties(webSource)).toEqual(expected);
  });
});
