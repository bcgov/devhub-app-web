import fetch from 'node-fetch'; // eslint-disable-line
import { getFilesFromRepo } from '../utils/fetchSourceGithub';
import { GITHUB_API, GITHUB_SOURCE } from '../__fixtures__/fixtures';

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch');
// mock console logs so that any error logs are not outputed during suite
global.console = {
  log: console.log,
  warn: jest.fn(),
  error: jest.fn(),
};
// eslint-disable-next-line

describe('Integration github api module', () => {
  it('returns a list of files', async () => {
    // mock out concurrent requests to githup api
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await getFilesFromRepo(GITHUB_SOURCE);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(3);
  });

  it('returns a list of files even if some fail', async () => {
    // mock out concurrent requests to githup api
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 }))
      )
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    const files = await getFilesFromRepo(GITHUB_SOURCE);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(2);
  });

  it('returns a list of files even if some fail', async () => {
    // mock out concurrent requests to githup api
    fetch.mockReturnValueOnce(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 }))
    );
    const files = await getFilesFromRepo(GITHUB_SOURCE);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(0);
  });

  it('throws if fetch fails', async () => {
    fetch.mockImplementation(() => {
      throw new Error('Fetch Failed');
    });
    try {
      await getFilesFromRepo(GITHUB_SOURCE);
    } catch (e) {
      expect(e.message).toBe('Fetch Failed');
    }
  });

  it('returns files if configurations are bad', async () => {
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.BAD_MD_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.BAD_MD_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await getFilesFromRepo(GITHUB_SOURCE);
    // console.log(files);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(1);
  });
});
