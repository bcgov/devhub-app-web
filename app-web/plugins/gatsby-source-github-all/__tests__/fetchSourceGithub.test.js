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
import {
  getNameOfExtensionVerbose,
  filterFilesByExtensions,
  filterFilesByContext,
  getExtensionFromName,
  getNameWithoutExtension,
  applyBaseMetadata,
  isConfigForFetchingAFile,
  isConfigForFetchingRepo,
  isConfigForFetchingFiles,
  createFetchFileRoute,
} from '../utils/sources/github/helpers';
import { validateSourceGithub, flattenGithubFilesToRegistryItems } from '../utils/sources/github';
import { fetchGithubTree, fetchFile, fetchRepo } from '../utils/sources/github/api';

import fetch from 'node-fetch';
import { GITHUB_API_ENDPOINT } from '../utils/constants';
import { GITHUB_API, GITHUB_SOURCE } from '../__fixtures__/fixtures';

jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch');
// eslint-disable-next-line
// suppress console errors
global.console = {
  error: jest.fn(),
  log: global.console.log,
  warn: jest.fn(),
};
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
  test('fetchFile returns data', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    const res = await fetchFile('https://github.com/pathfinder/foo', 'avalidtoken', {});
    expect(res).toEqual(GITHUB_API.FILE);
  });

  test('fetchFile returns undefined when status !== 200', async () => {
    const r = new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 });
    fetch.mockReturnValue(Promise.resolve(r));
    const res = await fetchFile('pathfinder', 'bcdevops', '/readme.md', 'avalidtoken');
    expect(res).toEqual(undefined);
  });

  test('fetchRepo returns data', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify({ description: 'foo' }))));
    expect.assertions(1);
    const res = await fetchRepo();
    expect(res).toEqual({ description: 'foo' });
  });

  test('fetchRepo returns data if failed', async () => {
    // simulating failure
    const r = new Response(JSON.stringify(GITHUB_API.FAIL), { status: 500 });
    fetch.mockReturnValue(Promise.reject(r));
    expect(await fetchRepo()).toEqual({});
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

  test('validateSourceGithub returns true when valid with optional params', () => {
    const SOURCE = {
      ...GITHUB_SOURCE,
      sourceProperties: { ...GITHUB_SOURCE.sourceProperties, file: 'blah' },
    };

    expect(validateSourceGithub(SOURCE)).toBe(true);
  });

  test('validateSourceGithub returns false when optional params are invalid', () => {
    const SOURCE = {
      ...GITHUB_SOURCE,
      sourceProperties: { ...GITHUB_SOURCE.sourceProperties, file: null },
    };

    expect(validateSourceGithub(SOURCE)).toBe(false);
  });

  test('validateSourceGithub returns false when source is invalid', () => {
    const BAD_SOURCE = {
      ...GITHUB_SOURCE,
      sourceProperties: { ...GITHUB_SOURCE.sourceProperties, url: null },
    };
    expect(validateSourceGithub(BAD_SOURCE)).toBe(false);
  });

  test('validateSourceGithub returns false if source type is configuired as the deprecated repo only config', () => {
    const BAD_SOURCE = {
      ...GITHUB_SOURCE,
      sourceProperties: {
        repo: 'foo',
        owner: 'bar',
        url: 'https://github.com/bar/foo',
      },
    };

    expect(validateSourceGithub(BAD_SOURCE)).toBe(false);
  });
  test('isConfigForFetchingRepo returns true if source properties is for a repo', () => {
    const sourceProperties = {
      repo: 'foo',
      owner: 'bar',
    };
    expect(isConfigForFetchingRepo(sourceProperties)).toBe(true);
  });

  test('isConfigForFetchingAFile returns true if source properties is for a file', () => {
    const sourceProperties = {
      repo: 'foo',
      owner: 'bar',
      file: '/something/test.md',
    };
    expect(isConfigForFetchingAFile(sourceProperties)).toBe(true);
  });

  test('isConfigForFetchingAFile returns false if source properties is not for a file', () => {
    const sourceProperties = {
      repo: 'foo',
      owner: 'bar',
    };
    expect(isConfigForFetchingAFile(sourceProperties)).toBe(false);
  });

  test('isConfigForFetchingFiles returns true if source properties is for a files', () => {
    const sourceProperties = {
      repo: 'foo',
      owner: 'bar',
      files: ['/something/test.md'],
    };
    expect(isConfigForFetchingFiles(sourceProperties)).toBe(true);
  });

  test('isConfigForFetchingFiles returns false if source properties is not for a file', () => {
    const sourceProperties = {
      repo: 'foo',
      owner: 'bar',
    };
    expect(isConfigForFetchingFiles(sourceProperties)).toBe(false);
  });

  test('createFetchFileRoute creates route', () => {
    expect(createFetchFileRoute('foo', 'bar', 'doc.md')).toBe(
      `${GITHUB_API_ENDPOINT}/repos/bar/foo/contents/doc.md`,
    );
    expect(createFetchFileRoute('foo', 'bar', 'doc.md', 'develop')).toBe(
      `${GITHUB_API_ENDPOINT}/repos/bar/foo/contents/doc.md?ref=develop`,
    );
  });

  test('flattenGithubFilesToRegistryItems flattens files', () => {
    const source = {
      sourceType: 'github',
      sourceProperties: {
        repo: 'foo',
        owner: 'baz',
        files: ['readme.md', 'docs/readme.md'],
      },
      attributes: {
        personas: ['Developer'],
      },
      resourceType: 'Comoponents',
    };

    const expected = [
      {
        sourceType: 'github',
        sourceProperties: {
          repo: 'foo',
          owner: 'baz',
          file: 'readme.md',
        },
        attributes: {
          personas: ['Developer'],
        },
        resourceType: 'Comoponents',
      },
      {
        sourceType: 'github',
        sourceProperties: {
          repo: 'foo',
          owner: 'baz',
          file: 'docs/readme.md',
        },
        attributes: {
          personas: ['Developer'],
        },
        resourceType: 'Comoponents',
      },
    ];

    expect(flattenGithubFilesToRegistryItems(source)).toEqual(expected);
  });
});
