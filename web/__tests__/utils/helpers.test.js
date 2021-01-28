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
  getGithubAvatarFromUsername,
  getGithubUsernameURL,
  getGithubIssuesRoute,
  getGithubFileContents,
  mapPagePathToResourceTypeConst,
  sortDevhubTopicsAfterSelectedTopics,
  getTextAndLink,
  buildFeaturedTopic,
  togglePills,
  reduceNodeForTableOfContents,
} from '../../src/utils/helpers';
import { GITHUB_URL } from '../../src/constants/api';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import { DEVHUB_NODE_1, DEVHUB_NODE_2 } from '../../__fixtures__/nodes';

describe('Helpers', () => {
  test('reduceNodeForTableOfContents', () => {
    const data = {
      path: '/foo',
      fields: {
        bar: true,
      },
    };

    expect(reduceNodeForTableOfContents(data)).toEqual({ path: '/foo', bar: true });
  });

  test('getGithubFileContents returns a promise of a string', async () => {
    fetch.mockResponse(
      JSON.stringify({
        content: 'fooo',
      }),
    );
    const response = await getGithubFileContents({ repo: 'foo', owner: 'bar', path: 'readme.md' });
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/bar/foo/contents/readme.md?ref=master',
      {
        signal: null,
      },
    );

    expect(response).toBe('fooo');
  });

  test('getGethubIssuesRoute returns a url', () => {
    const repo = 'foo';
    const owner = 'bar';
    const expected = `${GITHUB_URL}/${owner}/${repo}/issues`;
    expect(getGithubIssuesRoute(repo, owner)).toBe(expected);
  });

  test('getGithubUsernameUrl returns a url', () => {
    const username = 'billy@bob';
    const expected = `${GITHUB_URL}/${username}`;

    expect(getGithubUsernameURL(username)).toBe(expected);
  });

  test('getGithubAvatarFromUsername returns path to avatar image', () => {
    const username = 'billy@bob';
    const expected = `${GITHUB_URL}/${username}.png`;

    expect(getGithubAvatarFromUsername(username)).toBe(expected);
  });

  test('getGithubAvatarFromUsername returns path to avatar image with size', () => {
    const username = 'billy@bob';
    const size = 200;
    const expected = `${GITHUB_URL}/${username}.png?size=${size}`;

    expect(getGithubAvatarFromUsername(username, size)).toBe(expected);
  });

  test('getGithubAvatarFromUsername returns empty string is username does not exist', () => {
    const username = '';
    const expected = '';

    expect(getGithubAvatarFromUsername(username)).toBe(expected);
  });

  test('when passed /components returns Components', () => {
    expect(mapPagePathToResourceTypeConst('/components')).toBe(RESOURCE_TYPES.COMPONENTS);
  });

  test("when passed /foo returns undefined because it isn't a valid resource type", () => {
    expect(mapPagePathToResourceTypeConst('/foo')).toBeUndefined();
  });

  test('it sorts Featured Cards, Design System and Getting Started on the DevOps Patform so they are first and then everything else is sorted lexographically', () => {
    const topics = [
      { node: { name: 'Blah' } },
      { node: { name: 'Apple' } },
      { node: { name: 'Design System' } },
      { node: { name: 'Featured Resources' } },
      { node: { name: 'Getting Started on the DevOps Platform' } },
      { node: { name: 'Foo' } },
    ];
    const expected = [
      { node: { name: 'Featured Resources' } },
      { node: { name: 'Design System' } },
      { node: { name: 'Getting Started on the DevOps Platform' } },
      { node: { name: 'Apple' } },
      { node: { name: 'Blah' } },
      { node: { name: 'Foo' } },
    ];

    expect(sortDevhubTopicsAfterSelectedTopics(topics)).toEqual(expected);
  });

  describe('getTextAndLink', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?q=mobile',
      },
    });
    test('When given resourceType "Documentation" and a collection of resources grouped by type, it should return a link object', () => {
      const expected = {
        to: '/documentation?q=mobile',
        text: '2 results found',
      };
      const resourceType = RESOURCE_TYPES.DOCUMENTATION;
      const resourcesByType = {
        [RESOURCE_TYPES.DOCUMENTATION]: [DEVHUB_NODE_1, DEVHUB_NODE_2],
      };

      expect(getTextAndLink(resourceType, resourcesByType)).toEqual(expected);
    });
    test('When only one result is found for a given resourceType, the link string should have "result found" instead of "results found"', () => {
      const expected = {
        to: '/documentation?q=mobile',
        text: '1 result found',
      };
      const resourceType = RESOURCE_TYPES.DOCUMENTATION;
      const resourcesByType = {
        [RESOURCE_TYPES.DOCUMENTATION]: [DEVHUB_NODE_1],
      };

      expect(getTextAndLink(resourceType, resourcesByType)).toEqual(expected);
    });
  });

  describe('Building the Featured Topic', () => {
    it('builds the featured topic', () => {
      const nodes = [
        {
          fields: {
            title: 'foo',
            slug: 'foo',
          },
          internal: {
            type: 'GithubRaw',
          },
        },
        {
          fields: {
            title: 'bar',
            slug: 'bar',
          },
          internal: {
            type: 'DevhubSiphon',
          },
        },
        {
          fields: {
            title: 'baz',
            slug: 'baz',
          },
          internal: {
            type: 'GithubRaw',
          },
        },
      ];

      const featuredResources = ['foo', 'baz'];

      expect(
        buildFeaturedTopic(nodes, 'featured topic', 'description', 'featured', featuredResources),
      ).toMatchSnapshot();
    });
  });

  describe('toggle pill unit test', () => {
    test('if All pill toggled, none of other should be toggled', () => {
      const filterName = 'All';
      const activeList = ['billy', 'is', 'the', 'best'];
      const expected = ['All'];
      const temp = togglePills(filterName, activeList);
      expect(temp).toEqual(expected);
    });
    test('if one other pill toggled, All pill should not be toggled', () => {
      const filterName = 'billy';
      const activeList = ['All'];
      const expected = ['billy'];
      const temp = togglePills(filterName, activeList);
      expect(temp).toEqual(expected);
    });
    test('test if pills can be toggle on', () => {
      const filterName = 'billy';
      const activeList = ['who', 'is', 'the', 'best'];
      const expected = ['who', 'is', 'the', 'best', 'billy'];
      const temp = togglePills(filterName, activeList);
      expect(temp).toEqual(expected);
    });
    test('test if pills can be toggle off', () => {
      const filterName = 'billy';
      const activeList = ['billy', 'is', 'the', 'best'];
      const expected = ['is', 'the', 'best'];
      const temp = togglePills(filterName, activeList);
      expect(temp).toEqual(expected);
    });
    test('test if all pills are toggle off, only all result pill will be toggled on ', () => {
      const filterName = 'billy';
      const activeList = ['billy'];
      const expected = ['All'];
      const temp = togglePills(filterName, activeList);
      expect(temp).toEqual(expected);
    });
  });
});
