//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2018-10-12.
//
jest.mock('node-fetch');
// eslint-disable-next-line
import {
  getNameOfExtensionVerbose,
  fetchGithubTree,
  fetchFile,
  fetchIgnoreFile,
  validateSourceGithub,
  filterFilesByExtensions,
  filterFilesByContext,
  getExtensionFromName,
  getNameWithoutExtension,
  applyBaseMetadata,
} from '../utils/fetchSourceGithub';

// eslint-disable-next-line
import fetch from 'node-fetch';

const { Response } = jest.requireActual('node-fetch');
// eslint-disable-next-line
import { GITHUB_API, GITHUB_SOURCE } from '../__fixtures__/fixtures';

let entries = null;
let entriesInDir = null;

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
  entriesInDir = [
    {
      path: 'docs/a/something.md',
      type: 'blob',
    },
    {
      path: 'otherDocs/something.md',
      type: 'blob',
    },
    {
      path: 'docs/something.md',
      type: 'blob',
    },
    {
      path: 'a/docs/something.md',
      type: 'blob',
    },
    {
      path: 'something.md',
      type: 'blob',
    },
  ];
});

describe('Github API', () => {
  let fetchFileSucceeded = false;
  afterAll(() => {
    fetchFileSucceeded = false;
  });

  test('fetchFile returns data', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    const res = await fetchFile('pathfinder', 'bcdevops', '/readme.md', 'avalidtoken');
    expect(res).toEqual(GITHUB_API.FILE);
    fetchFileSucceeded = true;
  });

  test('fetchFile returns undefined when status !== 200', async () => {
    const r = new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 });
    fetch.mockReturnValue(Promise.resolve(r));
    const res = await fetchFile('pathfinder', 'bcdevops', '/readme.md', 'avalidtoken');
    expect(res).toEqual(undefined);
  });

  test('fetchFile fetches from branch if passed in', async () => {
    const branch = 'branchA';
    const token = 'TOKEN';
    const repo = 'REPO';
    const owner = 'OWNER';
    const path = 'test.md';
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    await fetchFile(repo, owner, path, token, branch);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/OWNER/REPO/contents/${path}?ref=${branch}`,
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer TOKEN',
          'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
        },
        method: 'GET',
      }),
    );
  });

  test('fetchIgnoreFile returns an array', async () => {
    if (!fetchFileSucceeded) {
      throw new Error('fetchIgnoreFile failed because fetchFile failed');
    }
    // mock fetch file
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.IGNORE_FILE))));
    const ignoreFile = await fetchIgnoreFile();

    expect(ignoreFile).toBeInstanceOf(Array);
  });

  test('fetchIgnoreFile returns an array if fetch fails', async () => {
    if (!fetchFileSucceeded) {
      throw new Error('fetchIgnoreFile failed because fetchFile failed');
    }
    // mock fetch file
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 })),
    );
    const ignoreFile = await fetchIgnoreFile();

    expect(ignoreFile).toBeInstanceOf(Array);
  });

  test('fetchIgnoreFile fetches from branch when passed in', async () => {
    const branch = 'branchA';
    const token = 'TOKEN';
    const repo = 'REPO';
    const owner = 'OWNER';
    const path = '.devhubignore';
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    await fetchIgnoreFile(repo, owner, token, branch);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/OWNER/REPO/contents/${path}?ref=${branch}`,
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer TOKEN',
          'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
        },
        method: 'GET',
      }),
    );
  });

  test('fetchGithubTree returns data', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE))));
    expect.assertions(1);
    const res = await fetchGithubTree();
    expect(res).toEqual(GITHUB_API.TREE);
  });

  test('fetchGithubTree fetches from branch if passed in', async () => {
    const branch = 'branchA';
    const token = 'TOKEN';
    const repo = 'REPO';
    const owner = 'OWNER';
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE))));
    await fetchGithubTree(repo, owner, token, branch);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/OWNER/REPO/git/trees/${branch}?recursive=1`,
      expect.objectContaining({
        headers: { Authorization: 'Bearer TOKEN' },
        method: 'GET',
      }),
    );
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

  test('filterFilesByExtensions succeeds with default params', () => {
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
    expect(filterFilesByExtensions(entries)).toEqual(expected);
  });

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

  test('filterFilesByContext filters entries', () => {
    const expected = [
      {
        path: 'docs/a/something.md',
        type: 'blob',
      },
      {
        path: 'otherDocs/something.md',
        type: 'blob',
      },
      {
        path: 'docs/something.md',
        type: 'blob',
      },
    ];
    const expected2 = [
      {
        path: 'docs/a/something.md',
        type: 'blob',
      },
    ];
    // here is assuming that there is at least one dontext dir specified
    // which is checked in filterFiles()
    const result1 = filterFilesByContext(entriesInDir, ['/docs', 'otherDocs']);
    const result2 = filterFilesByContext(entriesInDir, '/docs/a');
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

  test('getNameWithoutExtension works on extensionless names', () => {
    const file = '.gitignore';
    expect(getNameWithoutExtension(file)).toBe(file);
  });

  test('getNameWithoutExtension works on names with extensions', () => {
    const file = 'readme.md.md';
    const expected = 'readme.md';
    const file2 = 'something.txt';
    const expected2 = 'something';
    expect(getNameWithoutExtension(file)).toBe(expected);
    expect(getNameWithoutExtension(file2)).toBe(expected2);
  });

  test("applyBaseMetadata does it's thing", () => {
    const RAW_FILE = GITHUB_API.FILE;
    const labels = ['Components', 'Repository'];
    const owner = 'billybob';
    const source = 'Devhub';
    const sourceName = 'Devhub';
    const url = 'https://billybob.com';
    const expected = {
      ...RAW_FILE,
      content: RAW_FILE.content,
      metadata: {
        labels: ['Components', 'Repository'],
        sourceName: 'Devhub',
        source: 'Devhub',
        owner: 'billybob',
        name: 'manifest',
        fileType: 'JSON',
        fileName: 'manifest.json',
        mediaType: 'application/json',
        extension: 'json',
        sourceURL: 'https://billybob.com',
      },
    };
    expect(applyBaseMetadata(RAW_FILE, labels, owner, source, sourceName, url)).toEqual(expected);
  });

  test('validateSourceGithub returns true when valid', () => {
    expect(validateSourceGithub(GITHUB_SOURCE)).toBe(true);
  });

  test('validateSourceGithub returns false when source is invalid', () => {
    const BAD_SOURCE = { ...GITHUB_SOURCE, name: null };
    expect(validateSourceGithub(BAD_SOURCE)).toBe(false);
    const ANOTHER_BAD_SOURCE = {
      ...GITHUB_SOURCE,
      sourceProperties: { ...GITHUB_SOURCE.sourceProperties, url: null },
    };
    expect(validateSourceGithub(ANOTHER_BAD_SOURCE)).toBe(false);
  });
});
