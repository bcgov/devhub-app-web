jest.mock('crypto');

const { createGHNode, checkRegistry } = require('../sourceNodes');

describe('gatsby source github all plugin', () => {
  test('checkRegistry throws if a repo is missing an owner', () => {
    const registry = {
      repos: [
        {
          name: 'something',
          repo: '123',
          url: 'https://wadup.com',
          // missing owner
        },
      ],
    };

    expect(() => {
      checkRegistry(registry);
    }).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  });

  test('checkRegistry throws if a repo is missing repo', () => {
    const registry = {
      repos: [
        {
          name: 'something',
          owner: 'something',
          url: 'https://wadup.com',
        },
      ],
    };

    expect(() => {
      checkRegistry(registry);
    }).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  });

  test('checkRegistry throws if a repo is missing name', () => {
    const registry = {
      repos: [
        {
          repo: 'something',
          url: 'https://wadup.com',
          owner: 'something',
        },
      ],
    };

    expect(() => {
      checkRegistry(registry);
    }).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  });
  test('checkRegistry throws if a repo is missing url', () => {
    const registry = {
      repos: [
        {
          name: 'something',
          owner: 'something',
          repo: '123',
        },
      ],
    };

    expect(() => {
      checkRegistry(registry);
    }).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  });
  test('checkRegistry returns true if repo is valid', () => {
    const registry = {
      repos: [
        {
          name: '123',
          owner: '123',
          repo: '123',
          url: 'https://repo.com',
        },
      ],
    };

    expect(checkRegistry(registry)).toBe(true);
  });

  test('createGHNode returns data', () => {
    const file = {
      metadata: {
        name: 'test',
        source: 'something/something',
        owner: 'Billy Bob',
        fileType: 'Markdown',
        mediaType: 'application/test',
        extension: '.md',
      },
      name: 'test',
      path: '/test.md',
      sha: '123',
      size: 317,
      url:
        'https://api.github.com/repos/awesomeOrg/awesomeRepo/contents/public/manifest.json?ref=master',
      html_url:
        'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
      git_url:
        'https://api.github.com/repos/awesomeOrg/awesomeRepo/git/blobs/123',
      download_url:
        'https://raw.githubusercontent.com/awesomeOrg/awesomeRepo/master/public/manifest.json',
      type: 'file',
      content: 'content',
      _links: {
        self:
          'https://api.github.com/repos/awesomeOrg/awesomeRepo/contents/public/manifest.json?ref=master',
        git:
          'https://api.github.com/repos/awesomeOrg/awesomeRepo/git/blobs/123',
        html:
          'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
      },
    };
    const expected = {
      id: '123',
      children: [],
      fileName: 'test',
      fileType: 'Markdown',
      name: 'test',
      owner: 'Billy Bob',
      parent: null,
      path: '/test.md',
      source: 'something/something',
      sourceName: 'test',
      internal: {
        contentDigest: JSON.stringify(file),
        // Optional media type (https://en.wikipedia.org/wiki/Media_type) to indicate
        // to transformer plugins this node has data they can further process.
        mediaType: 'application/test',
        // A globally unique node type chosen by the plugin owner.
        type: 'SourceDevhubGithub',
        // Optional field exposing the raw content for this node
        // that transformer plugins can take and further process.
        content: 'content',
      },
    };

    expect(createGHNode(file, '123')).toEqual(expected);
  });
});
