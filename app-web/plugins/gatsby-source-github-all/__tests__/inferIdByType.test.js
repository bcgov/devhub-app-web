import { inferIdByType } from '../utils/inferIdByType';

describe('inferIdByType', () => {
  it('returns the url as the id when source type is web', () => {
    const source = {
      sourceType: 'web',
      sourceProperties: {
        url: 'https://github.com',
      },
    };

    expect(inferIdByType(source)).toBe(source.sourceProperties.url);
  });

  it('returns the reponame-pathtofile for source type github', () => {
    const source = {
      sourceType: 'github',
      sourceProperties: {
        repo: 'foo',
        owner: 'baz',
        file: 'docs/readme.md',
      },
    };

    expect(inferIdByType(source)).toBe(
      `${source.sourceProperties.repo}-${source.sourceProperties.file}`,
    );
  });

  it('throws if a non supported type is passed in', () => {
    const source = {
      sourceType: 'foo',
      sourceProperties: {
        repo: 'foo',
        owner: 'baz',
        file: 'docs/readme.md',
      },
    };

    expect(() => inferIdByType(source)).toThrow('Unable to infer a devhub id from type foo');
  });
});
