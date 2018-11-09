import matter from 'gray-matter'; // eslint-disable-line
import { fileTransformer } from '../utils/transformer';
import { markdownFrontmatterPlugin, markdownPagePathPlugin } from '../utils/plugins';
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_TXT,
  RAW_FILE_MD_WITH_RESOURCEPATH,
} from '../__fixtures__/fixtures';

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
    const transformedContent = fileTransformer(
      PROCESSED_FILE_TXT.metadata.extension,
      PROCESSED_FILE_TXT
    )
      .use(markdownFrontmatterPlugin)
      .resolve();
    expect(transformedContent).toEqual(PROCESSED_FILE_TXT);
  });

  test('transformer sets resourcePath to be resourcePath from metadata if it exists', () => {
    const data = matter(RAW_FILE_MD_WITH_RESOURCEPATH.content);
    expect(data.data.resourcePath).toBeDefined();
    const transformedFile = fileTransformer(
      RAW_FILE_MD_WITH_RESOURCEPATH.metadata.extension,
      RAW_FILE_MD_WITH_RESOURCEPATH
    )
      .use(markdownPagePathPlugin)
      .resolve();
    expect(transformedFile.metadata.resourcePath).toBe(data.data.resourcePath);
  });

  test('transformer sets pagePath to gatsby create page path by default', () => {
    const data = matter(PROCESSED_FILE_MD.content);
    const { metadata: { source, name } } = PROCESSED_FILE_MD;
    expect(data.data.resourcePath).toBe('');
    const transformedFile = fileTransformer(PROCESSED_FILE_MD.metadata.extension, PROCESSED_FILE_MD)
      .use(markdownPagePathPlugin)
      .resolve();
    expect(transformedFile.metadata.resourcePath).toBe(
      `/${source}/${source}${name}https:/github.com/bcgov/design-system/blob/master/components/header/README.md`
    );
  });
});
