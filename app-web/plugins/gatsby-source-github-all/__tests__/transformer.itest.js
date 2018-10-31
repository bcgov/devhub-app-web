import matter from 'gray-matter'; // eslint-disable-line
import { fileTransformer } from '../utils/transformer';
import { markdownFrontmatterPlugin } from '../utils/plugins';
import { PROCESSED_FILE_MD, PROCESSED_FILE_TXT } from '../__fixtures__/fixtures';

jest.unmock('@bcgov/common-web-utils');
jest.unmock('unist-util-visit');
jest.unmock('remark');
jest.unmock('gray-matter');

describe('Integration Tests Gatsby source github all transformer and Plugins', () => {
  test('transformer implicitly adds title front matter with markdown plugin', () => {
    const data1 = matter(PROCESSED_FILE_MD.content);
    expect(data1.data.title).not.toBeDefined();
    const transformedFile = fileTransformer(PROCESSED_FILE_MD.metadata.extension, PROCESSED_FILE_MD)
      .use(markdownFrontmatterPlugin)
      .resolve();
    expect(transformedFile.content).not.toBe(PROCESSED_FILE_MD.content);
    const data2 = matter(transformedFile.content);
    expect(data2.data.title).toBeDefined();
  });

  test('transformer leaves text files alone with markdown plugin', () => {
    const originalContent = PROCESSED_FILE_TXT.content;
    const transformedContent = fileTransformer(
      PROCESSED_FILE_TXT.metadata.extension,
      PROCESSED_FILE_TXT.content,
      PROCESSED_FILE_TXT
    )
      .use(markdownFrontmatterPlugin)
      .resolve();
    expect(transformedContent).toBe(originalContent);
  });
});
