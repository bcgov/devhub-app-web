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
import converter from '../../src/utils/gatsby-remark-transform-path';
import { FILE_QL_NODE, SIPHON_QL_NODE } from '../../__fixtures__/plugin-fixtures';

describe('Gatsby Remark Transform Path Converter Callback', () => {
  describe('Unit Tests', () => {
    it('converts only SourceDevhubGithub nodes', () => {
      const astType = 'image';
      const relativePath = '../images/banana.png';
      const transformedPath = converter(astType, relativePath, FILE_QL_NODE);

      expect(transformedPath).toBe(relativePath);
    });
    it('returns a a transformed url', () => {
      const astType = 'image';
      const relativePath = '../images/banana.png';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE);
      expect(transformedPath).not.toBe(relativePath);
    });
  });
  describe('Integration Tests', () => {
    jest.unmock('url');

    it('converts relative path to absolute', () => {
      const astType = 'link';
      const relativePath = '../something.md';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE);
      const expectedPath =
        'https://github.com/bcgov/design-system/blob/master/components/footer/something.md';
      expect(transformedPath).toBe(expectedPath);
    });

    it('converts relative path for image to absolute with raw paramater', () => {
      const astType = 'image';
      const relativePath = '../banana.png';
      const transformedPath = converter(astType, relativePath, SIPHON_QL_NODE);
      const expectedPath =
        'https://github.com/bcgov/design-system/blob/master/components/footer/banana.png?raw=true';
      expect(transformedPath).toBe(expectedPath);
    });
  });
});
