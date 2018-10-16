jest.mock('node-fetch');
// eslint-disable-next-line
import {
  getFilesFromRepo,
  getNameOfExtensionVerbose,
  fetchGithubTree,
  fetchFile,
  filterFilesByExtensions,
  getExtensionFromName,
} from '../utils/github-api';

// eslint-disable-next-line
import fetch from 'node-fetch';

const { Response } = jest.requireActual('node-fetch');
// eslint-disable-next-line
import { GITHUB_API } from '../__fixtures__/fixtures';

let entries = null;

beforeEach(() => {
  entries = [
    {
      path: 'something.md',
      type: 'blob',
    },
    {
      path: 'readme.md',
      type: 'blob',
    },
    {
      path: 'something.txt',
      type: 'blob',
    },
  ];
});

describe('Github API', () => {
  // test('getFilesFromRepo returns data', async () => {
  //   fetch.mockReturnValue(
  //     Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE)))
  //   );
  //   const res = await getFilesFromRepo('pathfinder', 'bcdevops', 'avalidtoken');
  //   expect(res).toEqual(GITHUB_API.FILE);
  // });

  test('fetchFile returns data', async () => {
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE)))
    );
    const res = await fetchFile(
      'pathfinder',
      'bcdevops',
      '/readme.md',
      'avalidtoken'
    );
    expect(res).toEqual(GITHUB_API.FILE);
  });

  test('fetchGithubTree returns data', async () => {
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))
    );
    expect.assertions(1);
    const res = await fetchGithubTree();
    expect(res).toEqual(GITHUB_API.TREE);
  });

  test('filterFilesByExtensions throws if no array of strings is passed', () => {
    const extensions1 = null;
    const extensions2 = ['', '234', 234];
    expect(() => {
      filterFilesByExtensions(entries, extensions1);
    }).toThrow('extensions must be an array of strings');
    expect(() => {
      filterFilesByExtensions(entries, extensions2);
    }).toThrow('extensions must be an array of strings');
  });

  test('filterFilesByExtensions throws if extensions dont start with .', () => {
    const extensions1 = ['', '234', '123'];
    expect(() => {
      filterFilesByExtensions(entries, extensions1);
    }).toThrow('extensions must have shape /\\.w+$/'); //eslint-disable-line
  });

  test('filterFilesByExtensions succeeds with default params', () => {});

  test('filerFilesByExtensions throws if entries are not passed', () => {
    expect(() => {
      filterFilesByExtensions();
    }).toThrow('entries are invalid');
  });

  test('filterFilesByExtensions filters entries', () => {
    const expected = [
      {
        path: 'something.md',
        type: 'blob',
      },
      {
        path: 'readme.md',
        type: 'blob',
      },
    ];
    const expected2 = [
      {
        path: 'something.md',
        type: 'blob',
      },
      {
        path: 'readme.md',
        type: 'blob',
      },
      {
        path: 'something.txt',
        type: 'blob',
      },
    ];
    const result1 = filterFilesByExtensions(entries);
    const result2 = filterFilesByExtensions(entries, ['.md', '.txt']);
    expect(result1).toEqual(expected);
    expect(result2).toEqual(expected2);
  });

  test('getExtensionFromName returns extension', () => {
    const expected1 = 'txt';
    const file1 = 'readme.txt';
    const expected2 = '';
    const file2 = '.gitignore';
    expect(getExtensionFromName(file1)).toBe(expected1);
    expect(getExtensionFromName(file2)).toBe(expected2);
  });

  test('getNameOfExtension returns name', () => {
    const expected1 = 'Markdown';
    const file1 = 'readme.md';
    const expected2 = '';
    const file2 = '.gitignore';
    expect(getNameOfExtensionVerbose(file1)).toBe(expected1);
    expect(getNameOfExtensionVerbose(file2)).toBe(expected2);
  });
});
