import { openPullExistsForBranch } from '../src/utils/github';
import octokit from '../src/octokit';
jest.mock('../src/octokit.js');
import { github } from '../src/config/index.json';

const { repo, owner } = github;

describe('Github Utilities', () => {
  test('openPullExistsForBranch returns true if exists', async () => {
    octokit.pulls.list.mockResolvedValue({ data: [{ base: { ref: 'foo' } }] });
    const pullExists = await openPullExistsForBranch('foo', repo, owner);
    expect(pullExists).toBe(false);
  });

  test("openPullExistsForBranch returns false if doesn't exist", async () => {
    octokit.pulls.list.mockResolvedValue({ data: [{ base: { ref: 'foo2' } }] });
    const pullExists = await openPullExistsForBranch('foo2', repo, owner);
    expect(pullExists).toBe(false);
  });
});
