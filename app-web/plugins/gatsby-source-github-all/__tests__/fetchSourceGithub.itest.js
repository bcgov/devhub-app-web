import fetch from 'node-fetch'; // eslint-disable-line
import { fetchSourceGithub, createFetchFileRoute } from '../utils/fetchSourceGithub';
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
  log: console.log,
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
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.IGNORE_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await fetchSourceGithub(GITHUB_SOURCE, 'TOKEN');
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(3);
  });

  it('returns a list of files filtered by devhubignore', async () => {
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify({ content: TREE_FILES.FILE2.path }))),
      )
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await fetchSourceGithub(GITHUB_SOURCE, 'TOKEN');
    const { repo, owner } = GITHUB_SOURCE_WITHIN_INLINE_IGNORES.sourceProperties;
    const fetchFile1Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE1.path);
    const fetchFile2Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE2.path);
    const fetchFile3Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE3.path);

    expect(fetch).toHaveBeenCalledWith(fetchFile1Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    // this one should not be called with fetchFile2 route
    expect(fetch).not.toHaveBeenCalledWith(fetchFile2Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    expect(fetch).toHaveBeenCalledWith(fetchFile3Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    expect(files.length).toBe(2);
  });

  it('returns a list of files filtered by inline ignores', async () => {
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.IGNORE_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await fetchSourceGithub(GITHUB_SOURCE_WITHIN_INLINE_IGNORES, 'TOKEN');
    const { repo, owner } = GITHUB_SOURCE_WITHIN_INLINE_IGNORES.sourceProperties;
    const fetchFile1Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE1.path);
    const fetchFile2Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE2.path);
    const fetchFile3Route = createFetchFileRoute(repo, owner, TREE_FILES.FILE3.path);

    // github source with inline ignores, has an inline ignore for the file 1 path (see fixtures)
    // we should expect fetch is not called with that file

    expect(fetch).not.toHaveBeenCalledWith(fetchFile1Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    expect(fetch).toHaveBeenCalledWith(fetchFile2Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    expect(fetch).toHaveBeenCalledWith(fetchFile3Route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer TOKEN`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });

    expect(files.length).toBe(2);
  });

  it('returns a list of files even if some fail', async () => {
    // mock out concurrent requests to githup api
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(GITHUB_API.FAIL), { status: 400 })),
      )
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));
    const files = await fetchSourceGithub(GITHUB_SOURCE);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(2);
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
    fetch
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.TREE)))) // first for getting tree
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.BAD_MD_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.BAD_MD_FILE))))
      .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(GITHUB_API.FILE))));

    const files = await fetchSourceGithub(GITHUB_SOURCE);
    // console.log(files);
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(1);
  });
});
