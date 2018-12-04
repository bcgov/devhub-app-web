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
} from '../../src/utils/helpers';
import { GITHUB_URL } from '../../src/constants/api';
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
});
