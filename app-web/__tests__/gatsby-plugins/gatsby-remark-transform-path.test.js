/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import {
  normalizeFilePath,
  isRelativePath,
  converter,
  getGithubBasePath,
} from '../../src/utils/gatsbyRemark';
import { FILE_QL_NODE, SIPHON_QL_NODE } from '../../__fixtures__/plugin-fixtures';

describe('Gatsby Remark Transform Path Converter Callback', () => {
  const getNode = jest.fn(() => ({
    _metadata: {
      sourceLocations: [
        [
          'https://github.com/bcgov/design-system/blob/master/components/footer/something/foo.md',
          '/foo/foo',
        ],
      ],
    },
  }));

  describe('Unit Tests', () => {
    it('normalizes paths', () => {
      const p1 = 'path1.md';
      const p2 = '/path1.md';
      const p3 = '../path1.md';
      const p4 = './path1.md';

      expect(normalizeFilePath(p1)).toBe('./path1.md');
      expect(normalizeFilePath(p2)).toBe(p2);
      expect(normalizeFilePath(p3)).toBe(p3);
      expect(normalizeFilePath(p4)).toBe(p4);
    });

    it('returns true if path is relative', () => {
      expect(isRelativePath('../path')).toBe(true);
      expect(isRelativePath('./path')).toBe(true);
      expect(isRelativePath('/path')).toBe(false);
      expect(isRelativePath('path')).toBe(false);
    });

    it('converts only SourceDevhubGithub nodes', () => {
      const astType = 'image';
      const relativePath = '../images/banana.png';
      const transformedPath = converter(astType, relativePath, FILE_QL_NODE, getNode);

      expect(transformedPath).toBe(relativePath);
    });

    it('returns a a transformed url', () => {
      const astType = 'image';
      const relativePath = '../images/banana.png';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE, getNode);
      expect(transformedPath).not.toBe(relativePath);
    });

    it('builds a github uri to the repo', () => {
      expect(getGithubBasePath('repo', 'owner')).toBe('https://github.com/owner/repo/blob/master/');
      expect(getGithubBasePath('repo', 'owner', 'dev')).toBe(
        'https://github.com/owner/repo/blob/dev/',
      );
    });

    it('builds github uri with master branch if branch is invalid', () => {
      expect(getGithubBasePath('repo', 'owner', null)).toBe(
        'https://github.com/owner/repo/blob/master/',
      );
    });
  });

  describe('Integration Tests', () => {
    jest.unmock('url');
    jest.unmock('valid-url');

    it('converts relative path to absolute', () => {
      const astType = 'link';
      const relativePath = '../something.md';

      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE, getNode);
      const expectedPath =
        'https://github.com/bcgov/design-system/blob/master/components/footer/something.md';
      expect(transformedPath).toBe(expectedPath);
    });

    it('converts path with no leading slash to relative', () => {
      const astType = 'link';
      const relativePath = 'doc.md';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE, getNode);
      const expectedPath =
        'https://github.com/bcgov/design-system/blob/master/components/footer/something/doc.md';
      expect(transformedPath).toBe(expectedPath);
    });

    it('converts relative path for image to absolute with raw paramater', () => {
      const astType = 'image';
      const relativePath = '../banana.png';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE, getNode);
      const expectedPath =
        'https://github.com/bcgov/design-system/blob/master/components/footer/banana.png?raw=true';
      expect(transformedPath).toBe(expectedPath);
    });

    it('converts a relative path to a gatsby page path if it exists in source locations', () => {
      const astType = 'link';
      const relativePath = './foo.md';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE, getNode);
      expect(transformedPath).toBe('/foo/foo');
    });
  });
});
