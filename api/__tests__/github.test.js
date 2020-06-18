import { openPullExistsForBranch } from '../src/utils/github';
import octokit from '../src/octokit';
jest.mock('../src/octokit.js');

describe('Github Utilities', () => {
  test('openPullExistsForBranch returns true if exists', async () => {
    octokit.pulls.list.mockResolvedValue({ data: [{ base: { ref: 'foo' } }] });
    const pullExists = await openPullExistsForBranch('foo', 'bar', 'baz');
    expect(pullExists).toBe(true);
  });

  test("openPullExistsForBranch returns false if doesn't exist", async () => {
    octokit.pulls.list.mockResolvedValue({ data: [{ base: { ref: 'foo2' } }] });
    const pullExists = await openPullExistsForBranch('foo', 'bar', 'baz');
    expect(pullExists).toBe(false);
  });
});
