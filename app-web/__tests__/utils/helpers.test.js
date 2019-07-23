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
  mapPagePathToResourceTypeConst,
  sortDevhubTopicsAfterSelectedTopics,
  getTextAndLink,
  buildPopularTopic,
} from '../../src/utils/helpers';
import { GITHUB_URL } from '../../src/constants/api';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import { DEVHUB_NODE_1, DEVHUB_NODE_2 } from '../../__fixtures__/nodes';

describe('Helpers', () => {
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
        text: 'two results found',
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
        text: 'one result found',
      };
      const resourceType = RESOURCE_TYPES.DOCUMENTATION;
      const resourcesByType = {
        [RESOURCE_TYPES.DOCUMENTATION]: [DEVHUB_NODE_1],
      };

      expect(getTextAndLink(resourceType, resourcesByType)).toEqual(expected);
    });
  });

  describe('Building the popular topic', () => {
    it('builds the popular topic', () => {
      const nodes = [
        {
          id: 1,
          pageViews: 5,
        },
        {
          id: 2,
          pageViews: 1,
        },
        {
          id: 3,
          pageViews: 2,
        },
        {
          id: 5,
          pageViews: 10,
        },
        {
          id: 1,
          pageViews: 5,
        },
      ];

      const popular = buildPopularTopic(nodes, 0, 10);

      expect(popular).toEqual(nodes);

      const popular2 = buildPopularTopic(nodes, 6, 10);
      expect(popular2.length).toBe(1);

      const popular3 = buildPopularTopic(nodes, 1, 3);

      expect(popular3.length).toBe(3);
    });
  });
});
