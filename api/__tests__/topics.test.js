import { createNewRefFromBase, createFile } from '../src/utils/github';
import octokit from '../src/octokit';
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
octokit.pulls.create.mockImplementation(() => Promise.resolve({ data: stubCreatePullRequest }));

describe('Creating Topics', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('Get branch reference', async () => {
    octokit.git.getRef = jest.fn().mockReturnValueOnce(Promise.resolve(stubGetRef));
    const ref = await octokit.git.getRef('foo', 'bar', '/heads/master');
    expect(ref).toEqual(stubGetRef);
  });

  test('Creates a new branch', async () => {
    // mock validate to be true
    octokit.git.createRef = jest.fn().mockReturnValueOnce(Promise.resolve(stubCreateRef));
    const createdRef = await octokit.git.createRef('bar', 'baz', '/heads/master/foo');
    expect(createdRef).toEqual(stubCreateRef);
  });

  test('Creates file in branch', async () => {
    octokit.repos.createOrUpdateFileContents = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(stubCreateFile));
    const createdFile = await createFile(
      'foo',
      'bar',
      '/test/path',
      '/heads/master/foo',
      'message',
      'content',
      'committer',
      'author',
    );
    expect(createdFile).toEqual(stubCreateFile);
  });
});
