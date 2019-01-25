import { extractUnfurlFromSourceProperties } from '../utils/sources/web/';
import { createUnfurlObj, mergeUnfurls } from '../utils/helpers';
jest.mock('../utils/helpers.js');

mergeUnfurls.mockImplementation((oldUnfurl, newUnfurl) => newUnfurl);
createUnfurlObj.mockImplementation(obj => obj);

describe('sourceType Web', () => {
  test('extractUnfurlFromSourceProperties returns an unfurl object', () => {
    const sourceProperties = {
      url: 'blah',
      author: 'yo',
      title: 'boop',
    };
    expect(extractUnfurlFromSourceProperties(sourceProperties)).toBeDefined();
  });
});
