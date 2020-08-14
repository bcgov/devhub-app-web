import {
  createNewRefFromBase,
  createFile,
  updateFile,
  createPullRequest,
} from '../src/utils/github';
import stubGetRef from '../__fixtures__/getRef.json';
import stubCreateRef from '../__fixtures__/createRef.json';
import stubCreateFile from '../__fixtures__/createFile.json';
import stubGetFileContent from '../__fixtures__/getFileContent.json';
import stubUpdateFile from '../__fixtures__/updateFile.json';
import stubCreatePullRequest from '../__fixtures__/createPullRequest.json';
import ajv from 'ajv';
import { github } from './src/helper';

jest.mock('../src/octokit.js');
jest.mock('ajv');

ajv.prototype.compile = jest.fn();

describe('Creating Topics', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('Creates a new branch', async () => {
    // mock validate to be true
    github.git.getRef = jest.fn().mockReturnValueOnce(Promise.resolve(stubGetRef));
    github.git.createRef = jest.fn().mockReturnValueOnce(Promise.resolve(stubCreateRef));
    const data = await createNewRefFromBase(github, 'bar', 'baz', '/heads/master/foo');
    expect(github.git.getRef).toHaveBeenCalled();
    expect(data).toEqual(stubCreateRef);
  });

  test('Creates file in branch', async () => {
    github.repos.createOrUpdateFileContents = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(stubCreateFile));
    const data = await createFile(
      github,
      'foo',
      'bar',
      '/test/path',
      '/heads/master/foo',
      'message',
      'content',
      'committer',
      'author',
    );
    expect(data).toEqual(stubCreateFile);
  });

  test('Update file in repo', async () => {
    github.repos.getContent = jest.fn().mockReturnValueOnce(Promise.resolve(stubGetFileContent));
    github.repos.createOrUpdateFileContents = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(stubUpdateFile));
    const data = await updateFile(
      github,
      'foo',
      'bar',
      '/test/path',
      '/heads/master/foo',
      'message',
      'content',
      'committer',
      'author',
    );
    expect(github.repos.getContent).toHaveBeenCalled();
    expect(data).toEqual(stubUpdateFile);
  });

  test('Create a pull request with branch', async () => {
    github.pulls.create = jest.fn().mockReturnValueOnce(Promise.resolve(stubCreatePullRequest));
    const data = await createPullRequest(
      github,
      'foo',
      'bar',
      '/heads/master/foo',
      'title',
      'head',
      'body',
    );
    expect(data).toEqual(stubCreatePullRequest);
  });
});
