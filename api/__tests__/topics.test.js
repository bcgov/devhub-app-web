import { createNewRefFromBase } from '../src/utils/github';
import octokit from '../src/octokit';

import stubGetRef from '../__fixtures__/getRef.json';
import stubCreateRef from '../__fixtures__/createRef.json';
import stubCreatePullRequest from '../__fixtures__/createPullRequest.json';
import ajv from 'ajv';
import {github} from '../src/config/index.json'

const { repo, owner } = github;

jest.mock('../src/octokit.js');
jest.mock('ajv');

ajv.prototype.compile = jest.fn();

octokit.git.getRef.mockImplementation(() => Promise.resolve({ data: stubGetRef }));
octokit.git.createRef.mockImplementation(() => Promise.resolve({ data: stubCreateRef }));
octokit.pulls.create.mockImplementation(() => Promise.resolve({ data: stubCreatePullRequest }));

describe('Creating Topics', () => {
  test('Creates a new branch', async () => {
    // mock validate to be true
    const res = await createNewRefFromBase(owner, repo, 'refs/heads/foo');
    expect(res).toEqual(stubCreateRef);
  });
});
