import fetch from 'node-fetch';
import { fetchSourceGithub } from '../utils/sources/github';
import { createFetchFileRoute } from '../utils/sources/github/helpers';
import {
  GITHUB_API,
  GITHUB_SOURCE,
  GITHUB_SOURCE_WITHIN_INLINE_IGNORES,
  TREE_FILES,
} from '../__fixtures__/fixtures';

jest.unmock('ignore');
const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch');
// mock console logs so that any error logs are not outputed during suite
global.console = {
  warn: jest.fn(),
  error: jest.fn(),
};
// eslint-disable-next-line

describe('Integration github api module', () => {
  beforeEach(() => {
    // reset calls to fetch for each test
    fetch.mockReset();
  });

  it('returns a list of files', async () => {
    // mock out concurrent requests to githup api
    fetch.mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await fetchSourceGithub(GITHUB_SOURCE, 'TOKEN');
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(1);
  });

  it('returns a list of files even if some fail', async () => {
    // mock out concurrent requests to githup api
    fetch.mockReturnValueOnce(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 })),
    );
    const files = await fetchSourceGithub(GITHUB_SOURCE);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(0);
  });

  it('throws if fetch fails', async () => {
    fetch.mockImplementation(() => {
      throw new Error('Fetch Failed');
    });
    try {
      await fetchSourceGithub(GITHUB_SOURCE);
    } catch (e) {
      expect(e.message).toBe('Fetch Failed');
    }
  });

  it('returns files if configurations are bad', async () => {
    fetch.mockReturnValueOnce(
      Promise.resolve(new Response(JSON.stringify(GITHUB_API.BAD_MD_FILE))),
    );

    const files = await fetchSourceGithub(GITHUB_SOURCE);
    // console.log(files);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(0);
  });
});
