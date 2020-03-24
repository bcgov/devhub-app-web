import {
  getQueries,
  queries,
  reduceNodesForIndex,
  NODE_TYPE_FIELD_NAME,
} from '../../src/utils/algolia';

/*
Copyright 2019 Province of British Columbia

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

describe('Algolia Utils', () => {
  test('getQueries returns queries with indexName suffixed', () => {
    const suffixedQueries = getQueries('baz');
    suffixedQueries.forEach(q => {
      expect(/-baz$/.test(q.indexName)).toBe(true);
    });
  });

  test('getQueries returns queries unchanged when no suffix passed', () => {
    const suffixedQueries = getQueries();
    expect(suffixedQueries).toEqual(queries);
  });

  describe(' Algolia reducers', () => {
    test('flattening nodes', () => {
      const data = [
        {
          id: '123123',
          childMarkdownRemark: {
            fields: {
              title: 'foo',
              description: 'abcabc',
            },
            frontmatter: {
              personas: 'Developer',
            },
            content: 'foo',
          },
          internal: {
            type: 'GithubRaw',
          },
        },
        {
          id: '232323',
          childMarkdownRemark: {
            fields: {
              title: 'foo2',
              description: 'xzcv',
            },
            frontmatter: {
              personas: 'Developer',
            },
            content: 'foo',
          },
          internal: {
            type: 'GithubRaw',
          },
        },
        {
          id: '232323',
          childMarkdownRemark: {
            fields: {
              title: 'foo3',
              description: 'asdfad',
            },
            frontmatter: {
              personas: 'Developer',
            },
            content: 'foo',
          },
          internal: {
            type: 'GithubRaw',
          },
        },
        {
          id: 'foo',
          fields: {
            title: 'foo4',
            description: 'asdfad',
          },
          internal: {
            type: 'RandoType',
          },
        },
      ];

      const expected = [
        {
          id: '123123',
          content: 'foo',
          fields: { title: 'foo', description: 'abcabc' },
          persona: 'Developer',
          [NODE_TYPE_FIELD_NAME]: 'GithubRaw',
        },
        {
          id: '232323',
          content: 'foo',
          fields: { title: 'foo2', description: 'xzcv' },
          persona: 'Developer',
          [NODE_TYPE_FIELD_NAME]: 'GithubRaw',
        },
        {
          id: '232323',
          content: 'foo',
          fields: { title: 'foo3', description: 'asdfad' },
          persona: 'Developer',
          [NODE_TYPE_FIELD_NAME]: 'GithubRaw',
        },
        {
          id: 'foo',
          content: '',
          fields: { title: 'foo4', description: 'asdfad' },
          [NODE_TYPE_FIELD_NAME]: 'RandoType',
        },
      ];
      const test1 = reduceNodesForIndex(data);
      expect(test1).toEqual(expected);
    });
  });
});
