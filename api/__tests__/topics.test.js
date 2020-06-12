import { createOrUpdateTopic, createNewRefFromBase } from '../src/utils/github';
import octokit from '../src/octokit';

import stubTopic from '../__fixtures__/topic1.json';
import stubGetRef from '../__fixtures__/getRef.json';
import stubCreateRef from '../__fixtures__/createRef.json';
import stubCreateFile from '../__fixtures__/createFile.json';
import stubCreatePullRequest from '../__fixtures__/createPullRequest.json';
import ajv from 'ajv';

jest.mock('../src/octokit.js');
jest.mock('ajv');

ajv.prototype.compile = jest.fn();

octokit.git.getRef.mockImplementation(() => Promise.resolve({ data: stubGetRef }));
octokit.git.createRef.mockImplementation(() => Promise.resolve({ data: stubCreateRef }));
octokit.repos.createOrUpdateFile.mockImplementation(() =>
  Promise.resolve({ data: stubCreateFile }),
);
octokit.pulls.create.mockImplementation(() => Promise.resolve({ data: stubCreatePullRequest }));

describe('Creating Topics', () => {
  test('Creates a new branch', async () => {
    // mock validate to be true
    const res = await createNewRefFromBase('foo', 'bar', '/heads/master');
    expect(res).toEqual(stubCreateRef);
  });
});
