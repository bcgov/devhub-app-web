import fetch from 'node-fetch'; // eslint-disable-line
import { GITHUB_API, GITHUB_SOURCE } from '../__fixtures__/fixtures';

import { getFilesFromRepo } from '../utils/fetchSourceGithub';
const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch');
// mock console logs so that any error logs are not outputed during suite
global.console = {
  warn: jest.fn(),
  error: jest.fn(),
  log: console.log,
};

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
    // although 4 files are mocked to fetch, in thte actual tree fixture only 3 valid files are
    // returned after all of the filtering
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBeGreaterThan(1);
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
});
